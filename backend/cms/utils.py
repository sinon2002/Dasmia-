import io
import os
import re
import time
import hashlib
import shutil
import subprocess
import tempfile
from PIL import Image, ImageOps
from django.core.files.base import ContentFile


def clean_filename_base(name, max_length=35):
    """
    Strips existing hash suffixes and generates a safe, clean ASCII-friendly base name.
    Example: 'IMG_9005_7a9f3c1d.webp' -> 'IMG_9005'
    """
    base_name, _ = os.path.splitext(os.path.basename(name))
    # Strip existing 8 to 16 hex hashes or django random suffixes (e.g. _a1b2c3d4 or _0GuqsVM)
    base_name = re.sub(r'_[a-zA-Z0-9]{7,16}$', '', base_name)
    clean = re.sub(r'[^a-zA-Z0-9_-]', '_', base_name).strip('_')
    return clean[:max_length] or 'media'


def hashed_upload_to(subfolder):
    """
    Upload path generator callable for Django FileField/ImageField.
    Appends a unique hash to the filename so every upload has a cache-busting URL.
    Usage:
        image = models.ImageField(upload_to=hashed_upload_to('blocks'))
    """
    def _upload_path(instance, filename):
        ext = os.path.splitext(filename)[1].lower()
        clean_base = clean_filename_base(filename)
        unique_token = hashlib.sha256(f"{filename}_{time.time()}_{getattr(instance, 'pk', '')}".encode()).hexdigest()[:12]
        return f"cms/{subfolder}/{clean_base}_{unique_token}{ext}"
    return _upload_path


def process_and_optimize_image(image_field, max_width=1920, max_height=1920, quality=75, to_webp=True, force=False):
    """
    Optimizes uploaded images with ImageMagick (if available) or Pillow:
    - Fixes EXIF rotation so mobile uploads are upright
    - Strips unnecessary metadata chunks
    - Resizes down if exceeds max_width/max_height while preserving aspect ratio
    - Converts to WebP with method=6 compression
    - Generates a content hash (SHA-256) for cache-busting so browsers/CDNs update immediately
    - Skips re-processing unchanged files already committed to the database
    - Reuses identical files on disk instead of creating duplicate files
    - Deletes previously replaced image from storage to prevent orphaned files
    """
    if not image_field or not hasattr(image_field, 'file'):
        return

    # If the file is already committed (not newly uploaded or changed) and force is not set, skip!
    if getattr(image_field, '_committed', True) and not force:
        return

    try:
        if not hasattr(image_field.file, 'read'):
            return

        orig_name = os.path.basename(image_field.name)
        clean_base = clean_filename_base(orig_name)
        target_ext = "webp" if to_webp else "jpg"

        # Identify previous file to clean up if this is an existing instance updating its image
        old_file_to_delete = None
        instance = getattr(image_field, 'instance', None)
        field = getattr(image_field, 'field', None)
        field_name = getattr(field, 'name', None) if field else None
        if instance and instance.pk and field_name:
            try:
                old_obj = instance.__class__.objects.filter(pk=instance.pk).only(field_name).first()
                if old_obj:
                    old_val = getattr(old_obj, field_name)
                    if old_val and old_val.name:
                        old_file_to_delete = old_val.name
            except Exception:
                pass

        magick_bin = shutil.which('magick') or shutil.which('convert')
        optimized_bytes = None

        if magick_bin:
            image_field.file.seek(0)
            with tempfile.NamedTemporaryFile(suffix=os.path.splitext(orig_name)[1], delete=False) as in_tmp:
                in_tmp.write(image_field.file.read())
                in_tmp_path = in_tmp.name

            out_tmp_path = in_tmp_path + f".out.{target_ext}"
            try:
                cmd = [
                    magick_bin, in_tmp_path,
                    '-auto-orient',
                    '-strip',
                    '-resize', f'{max_width}x{max_height}>',
                    '-quality', str(quality),
                ]
                if to_webp:
                    cmd.extend([
                        '-define', 'webp:method=6',
                        '-define', 'webp:filter-strength=15',
                        '-define', 'webp:auto-filter=true',
                        '-define', 'webp:alpha-compression=1',
                    ])
                cmd.append(out_tmp_path)
                subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                with open(out_tmp_path, 'rb') as f_out:
                    optimized_bytes = f_out.read()
            finally:
                if os.path.exists(in_tmp_path):
                    os.remove(in_tmp_path)
                if os.path.exists(out_tmp_path):
                    os.remove(out_tmp_path)

        if optimized_bytes is None:
            # Fallback to Pillow
            image_field.file.seek(0)
            img = Image.open(image_field.file)
            img = ImageOps.exif_transpose(img)

            if img.mode in ('RGBA', 'LA') and not to_webp:
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])
                img = background
            elif img.mode not in ('RGB', 'RGBA'):
                img = img.convert('RGB')

            if img.width > max_width or img.height > max_height:
                img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)

            output = io.BytesIO()
            if to_webp:
                img.save(output, format='WEBP', quality=quality, method=6)
            else:
                img.save(output, format='JPEG', quality=quality, optimize=True)

            optimized_bytes = output.getvalue()

        # Compute SHA-256 hash of the final optimized image content
        content_hash = hashlib.sha256(optimized_bytes).hexdigest()[:12]
        new_filename = f"{clean_base}_{content_hash}.{target_ext}"

        # Target full path under storage
        target_path = image_field.field.generate_filename(instance, new_filename) if (field and instance) else new_filename

        storage = image_field.storage
        if storage.exists(target_path):
            # Identical file already exists on storage, reuse it without duplicating
            image_field.name = target_path
            image_field._committed = True
        else:
            image_field.save(new_filename, ContentFile(optimized_bytes), save=False)
            image_field._committed = True

        # Clean up previous replaced file if different
        if old_file_to_delete and old_file_to_delete != image_field.name:
            try:
                if storage.exists(old_file_to_delete):
                    storage.delete(old_file_to_delete)
            except Exception as e:
                print(f"⚠️ Could not delete replaced media file {old_file_to_delete}: {e}")

    except Exception as e:
        print(f"⚠️ Image optimization warning: {e}")
