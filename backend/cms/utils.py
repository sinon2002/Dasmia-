import io
import os
import shutil
import subprocess
import tempfile
from PIL import Image, ImageOps
from django.core.files.base import ContentFile

def process_and_optimize_image(image_field, max_width=1920, max_height=1920, quality=75, to_webp=True):
    """
    Optimizes uploaded images with ImageMagick (if available) or Pillow:
    - Fixes EXIF rotation so mobile uploads are upright
    - Strips unnecessary metadata chunks
    - Resizes down if exceeds max_width/max_height while preserving aspect ratio
    - Converts to WebP with method=6 compression
    """
    if not image_field or not hasattr(image_field, 'file'):
        return

    try:
        if not hasattr(image_field.file, 'read'):
            return

        orig_name = os.path.basename(image_field.name)
        base_name, _ = os.path.splitext(orig_name)
        target_ext = "webp" if to_webp else "jpg"
        new_filename = f"{base_name}.{target_ext}"

        magick_bin = shutil.which('magick') or shutil.which('convert')
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
                    image_field.save(new_filename, ContentFile(f_out.read()), save=False)
                return
            finally:
                if os.path.exists(in_tmp_path):
                    os.remove(in_tmp_path)
                if os.path.exists(out_tmp_path):
                    os.remove(out_tmp_path)

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

        output.seek(0)
        image_field.save(new_filename, ContentFile(output.getvalue()), save=False)
    except Exception as e:
        print(f"⚠️ Image optimization warning: {e}")
