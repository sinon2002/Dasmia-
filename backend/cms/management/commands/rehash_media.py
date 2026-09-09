import os
import re
import hashlib
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from cms.models import ContentBlock, Direction, DirectionGalleryImage, News, MediaAsset
from cms.utils import clean_filename_base


class Command(BaseCommand):
    help = 'Re-hashes existing media files in the database so that every image has a content-based hash in its URL'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Preview file renamings without modifying storage or database',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        self.stdout.write("Starting media re-hashing...")

        targets = [
            (ContentBlock, 'image'),
            (Direction, 'cover_image'),
            (DirectionGalleryImage, 'image'),
            (News, 'cover_image'),
            (MediaAsset, 'image'),
        ]

        total_checked = 0
        renamed_count = 0
        already_hashed_count = 0
        missing_count = 0

        for model_cls, field_name in targets:
            self.stdout.write(f"\nProcessing {model_cls.__name__}.{field_name}...")
            for obj in model_cls.objects.all():
                file_field = getattr(obj, field_name, None)
                if not file_field or not file_field.name:
                    continue

                total_checked += 1
                storage = file_field.storage
                old_name = file_field.name

                if not storage.exists(old_name):
                    self.stdout.write(self.style.WARNING(f"  ⚠️ Missing file on storage: {old_name} (ID: {obj.pk})"))
                    missing_count += 1
                    continue

                try:
                    with storage.open(old_name, 'rb') as f:
                        content = f.read()
                except Exception as e:
                    self.stderr.write(f"  ❌ Could not read {old_name}: {e}")
                    continue

                content_hash = hashlib.sha256(content).hexdigest()[:12]
                folder = os.path.dirname(old_name)
                ext = os.path.splitext(old_name)[1].lower() or '.webp'
                clean_base = clean_filename_base(old_name)

                # Check if old name already ends with this content hash
                if old_name.endswith(f"_{content_hash}{ext}"):
                    already_hashed_count += 1
                    continue

                new_name = os.path.join(folder, f"{clean_base}_{content_hash}{ext}").replace('\\', '/')

                if dry_run:
                    self.stdout.write(f"  [DRY-RUN] {old_name} -> {new_name}")
                    renamed_count += 1
                    continue

                # Save new file content
                if not storage.exists(new_name):
                    storage.save(new_name, ContentFile(content))

                # Update database record
                file_field.name = new_name
                update_fields = [field_name]
                if hasattr(obj, 'updated_at'):
                    update_fields.append('updated_at')
                obj.save(update_fields=update_fields)

                # Clean up old file if different
                if old_name != new_name and storage.exists(old_name):
                    try:
                        storage.delete(old_name)
                    except Exception as e:
                        self.stderr.write(f"  Could not delete old file {old_name}: {e}")

                self.stdout.write(self.style.SUCCESS(f"  ✅ Renamed: {old_name} -> {new_name}"))
                renamed_count += 1

        self.stdout.write("\n" + "=" * 50)
        self.stdout.write(f"Total checked: {total_checked}")
        self.stdout.write(f"Already hashed: {already_hashed_count}")
        self.stdout.write(f"Missing on disk: {missing_count}")
        self.stdout.write(self.style.SUCCESS(f"Successfully re-hashed: {renamed_count} files!"))
