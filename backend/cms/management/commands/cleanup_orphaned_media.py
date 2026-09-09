import os
from django.core.management.base import BaseCommand
from django.conf import settings
from cms.models import ContentBlock, Direction, DirectionGalleryImage, News, MediaAsset


class Command(BaseCommand):
    help = 'Cleans up orphaned media files from disk that are no longer referenced in the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Simulate cleanup without actually deleting any files',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']

        # Collect all active media file paths from database
        db_images = set()
        for cb in ContentBlock.objects.all():
            if cb.image and cb.image.name:
                db_images.add(os.path.normpath(cb.image.name))
        for d in Direction.objects.all():
            if d.cover_image and d.cover_image.name:
                db_images.add(os.path.normpath(d.cover_image.name))
        for g in DirectionGalleryImage.objects.all():
            if g.image and g.image.name:
                db_images.add(os.path.normpath(g.image.name))
        for n in News.objects.all():
            if n.cover_image and n.cover_image.name:
                db_images.add(os.path.normpath(n.cover_image.name))
        for m in MediaAsset.objects.all():
            if m.image and m.image.name:
                db_images.add(os.path.normpath(m.image.name))

        media_root = settings.MEDIA_ROOT
        orphans = []
        total_files = 0

        for root, _, files in os.walk(media_root):
            for file_name in files:
                total_files += 1
                abs_path = os.path.join(root, file_name)
                rel_path = os.path.normpath(os.path.relpath(abs_path, media_root))

                if rel_path not in db_images:
                    orphans.append((abs_path, rel_path))

        self.stdout.write(f"Total media files on disk: {total_files}")
        self.stdout.write(f"Active media files in DB: {len(db_images)}")
        self.stdout.write(f"Orphaned files found: {len(orphans)}")

        if not orphans:
            self.stdout.write(self.style.SUCCESS("No orphaned files found. Storage is clean!"))
            return

        if dry_run:
            self.stdout.write(self.style.WARNING("Dry run enabled. The following files would be removed:"))
            for _, rel in orphans[:20]:
                self.stdout.write(f"  - {rel}")
            if len(orphans) > 20:
                self.stdout.write(f"  ... and {len(orphans) - 20} more.")
        else:
            deleted_count = 0
            for abs_p, _ in orphans:
                try:
                    os.remove(abs_p)
                    deleted_count += 1
                except Exception as e:
                    self.stderr.write(f"Could not delete {abs_p}: {e}")

            self.stdout.write(self.style.SUCCESS(f"Successfully deleted {deleted_count} orphaned files!"))
