import os
import shutil
from pathlib import Path
from django.conf import settings
from django.http import Http404, FileResponse
from django.views.static import serve
from django.views.decorators.cache import never_cache
from .utils import clean_filename_base
from rest_framework import generics
from .models import SiteTranslation
from .serializers import SiteTranslationSerializer

def serve_media_with_fallback(request, path, document_root=None):
    """
    Serves user-uploaded media files from MEDIA_ROOT.
    If the requested file is missing from MEDIA_ROOT (common in fresh clones or when
    media/ is ignored by git), gracefully attempts to:
    1. Look up the source file in frontend public/assets/images by base name or exact name.
    2. Auto-restore/copy it to MEDIA_ROOT so subsequent requests are fast.
    3. Fall back to no_image.png placeholder instead of a broken 404 image.
    """
    doc_root = Path(document_root or settings.MEDIA_ROOT)
    target_file = doc_root / path

    if target_file.exists() and target_file.is_file():
        view = never_cache(serve) if settings.DEBUG else serve
        return view(request, path, document_root=str(doc_root))

    # Attempt to restore from public assets
    public_images_dir = Path(settings.BASE_DIR).parent / "public" / "assets" / "images"
    if public_images_dir.exists():
        filename = os.path.basename(path)
        clean_base = clean_filename_base(filename)
        ext = os.path.splitext(filename)[1].lower()

        candidate = None
        # 1. Exact match in public assets
        if (public_images_dir / filename).is_file():
            candidate = public_images_dir / filename
        else:
            # 2. Match by clean base + original extension or common formats
            for candidate_ext in [ext, ".webp", ".png", ".jpg", ".jpeg"]:
                test_path = public_images_dir / f"{clean_base}{candidate_ext}"
                if test_path.is_file():
                    candidate = test_path
                    break

        if candidate and candidate.is_file():
            try:
                target_file.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(candidate, target_file)
                view = never_cache(serve) if settings.DEBUG else serve
                return view(request, path, document_root=str(doc_root))
            except Exception:
                # If cannot copy, serve candidate directly
                return FileResponse(open(candidate, "rb"))

        # 3. Fall back to placeholder if available
        no_image = public_images_dir / "no_image.png"
        if no_image.is_file():
            return FileResponse(open(no_image, "rb"), content_type="image/png")

    # If nothing found, call standard serve which will raise Http404 cleanly
    return serve(request, path, document_root=str(doc_root))

# Gets to frontend all list of key transfers
class SiteTranslationListView(generics.ListAPIView):
    queryset = SiteTranslation.objects.all()
    serializer_class = SiteTranslationSerializer
    pagination_class = None #disable pagination so Nextjs gets all translations at once
