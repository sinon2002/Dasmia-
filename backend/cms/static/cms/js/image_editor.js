/**
 * DASMIA Django Admin Image Editor
 * Interactive cropping, rotation, filters, and WebP export integration with Cropper.js
 */

(function () {
  'use strict';

  let activeCropper = null;
  let activeWidget = null;
  let activeModal = null;
  let currentFilter = { brightness: 100, contrast: 100, saturate: 100 };
  let flipH = 1;
  let flipV = 1;

  function initImageWidgets() {
    document.querySelectorAll('.dasmia-image-widget:not([data-initialized])').forEach(function (widget) {
      widget.setAttribute('data-initialized', 'true');
      setupWidget(widget);
    });
  }

  function setupWidget(widget) {
    const fileInput = widget.querySelector('.dasmia-real-file-input');
    const uploadBtn = widget.querySelector('.dasmia-btn-upload');
    const editBtn = widget.querySelector('.dasmia-btn-edit');
    const clearBtn = widget.querySelector('.dasmia-btn-clear');
    const clearCheckbox = widget.querySelector('input[type="checkbox"][name$="-clear"]');
    const thumbImg = widget.querySelector('.dasmia-image-thumb');
    const filenameEl = widget.querySelector('.dasmia-filename');
    const badgeEl = widget.querySelector('.dasmia-badge');

    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener('click', function (e) {
        e.preventDefault();
        fileInput.click();
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', function () {
        if (fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            if (thumbImg) {
              thumbImg.src = e.target.result;
              thumbImg.style.display = 'block';
            }
            if (filenameEl) filenameEl.textContent = file.name;
            if (badgeEl) {
              badgeEl.textContent = `Новый файл (${Math.round(file.size / 1024)} KB)`;
              badgeEl.style.display = 'inline-block';
            }
            if (editBtn) editBtn.style.display = 'inline-flex';
            if (clearCheckbox) clearCheckbox.checked = false;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (clearBtn && clearCheckbox) {
      clearBtn.addEventListener('click', function (e) {
        e.preventDefault();
        clearCheckbox.checked = true;
        if (fileInput) fileInput.value = '';
        if (thumbImg) {
          thumbImg.src = '';
          thumbImg.style.display = 'none';
        }
        if (filenameEl) filenameEl.textContent = 'Файл удалён';
        if (badgeEl) badgeEl.style.display = 'none';
        if (editBtn) editBtn.style.display = 'none';
      });
    }

    if (editBtn) {
      editBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openEditorModal(widget);
      });
    }
  }

  function openEditorModal(widget) {
    activeWidget = widget;
    const thumbImg = widget.querySelector('.dasmia-image-thumb');
    const imgSrc = thumbImg ? thumbImg.src : null;
    if (!imgSrc) {
      alert('Нет изображения для редактирования.');
      return;
    }

    // Reset filters and flips
    currentFilter = { brightness: 100, contrast: 100, saturate: 100 };
    flipH = 1;
    flipV = 1;

    let modal = document.getElementById('dasmia-image-editor-modal');
    if (!modal) {
      modal = createModalDOM();
      document.body.appendChild(modal);
    }

    activeModal = modal;
    const cropImg = modal.querySelector('#dasmia-crop-image');
    cropImg.src = imgSrc;
    cropImg.style.filter = 'none';

    // Reset sliders
    modal.querySelector('#dasmia-slider-brightness').value = 100;
    modal.querySelector('#dasmia-slider-contrast').value = 100;
    modal.querySelector('#dasmia-slider-saturate').value = 100;

    modal.style.display = 'flex';

    if (activeCropper) {
      activeCropper.destroy();
    }

    // Wait for image to load before init Cropper
    if (cropImg.complete) {
      startCropper(cropImg, modal);
    } else {
      cropImg.onload = function () {
        startCropper(cropImg, modal);
      };
    }
  }

  function startCropper(cropImg, modal) {
    if (typeof Cropper === 'undefined') {
      console.error('Cropper.js is not loaded');
      return;
    }

    activeCropper = new Cropper(cropImg, {
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 0.95,
      restore: false,
      guides: true,
      center: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      crop: function (event) {
        const dimEl = modal.querySelector('#dasmia-crop-dimensions');
        if (dimEl) {
          const w = Math.round(event.detail.width);
          const h = Math.round(event.detail.height);
          dimEl.innerHTML = `Размер области: <strong>${w} × ${h} px</strong>`;
        }
      },
    });
  }

  function createModalDOM() {
    const backdrop = document.createElement('div');
    backdrop.id = 'dasmia-image-editor-modal';
    backdrop.className = 'dasmia-modal-backdrop';
    backdrop.style.display = 'none';

    backdrop.innerHTML = `
      <div class="dasmia-modal-dialog">
        <div class="dasmia-modal-header">
          <h3 class="dasmia-modal-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2v14a2 2 0 0 0 2 2h14"></path>
              <path d="M18 22V8a2 2 0 0 0-2-2H2"></path>
            </svg>
            Редактор изображений DASMIA
          </h3>
          <button type="button" class="dasmia-modal-close" id="dasmia-modal-close-btn">&times;</button>
        </div>

        <div class="dasmia-modal-body">
          <!-- Viewport -->
          <div class="dasmia-crop-viewport">
            <img id="dasmia-crop-image" src="" alt="Редактирование" />
          </div>

          <!-- Aspect Ratio Toolbar -->
          <div class="dasmia-toolbar-row">
            <div class="dasmia-toolbar-group">
              <span class="dasmia-toolbar-label">Пропорции:</span>
              <button type="button" class="dasmia-ratio-pill active" data-ratio="NaN">Свободный</button>
              <button type="button" class="dasmia-ratio-pill" data-ratio="1.7777777778">16:9 (Hero/Баннер)</button>
              <button type="button" class="dasmia-ratio-pill" data-ratio="0.8">4:5 (Карточка)</button>
              <button type="button" class="dasmia-ratio-pill" data-ratio="2.285714">16:7 (Широкий)</button>
              <button type="button" class="dasmia-ratio-pill" data-ratio="1.3333333333">4:3 (Фото)</button>
              <button type="button" class="dasmia-ratio-pill" data-ratio="1">1:1 (Квадрат)</button>
            </div>
            <div class="dasmia-toolbar-group">
              <span class="dasmia-toolbar-label">Трансформация:</span>
              <button type="button" class="dasmia-ratio-pill" id="dasmia-btn-rot-left" title="Повернуть влево (-90°)">↺ -90°</button>
              <button type="button" class="dasmia-ratio-pill" id="dasmia-btn-rot-right" title="Повернуть вправо (+90°)">↻ +90°</button>
              <button type="button" class="dasmia-ratio-pill" id="dasmia-btn-flip-h" title="Отразить по горизонтали">⇄ Flip H</button>
              <button type="button" class="dasmia-ratio-pill" id="dasmia-btn-flip-v" title="Отразить по вертикали">⇅ Flip V</button>
              <button type="button" class="dasmia-ratio-pill" id="dasmia-btn-reset" title="Сбросить кадрирование">⏪ Сброс</button>
            </div>
          </div>

          <!-- Adjustments & Filters -->
          <div class="dasmia-toolbar-row">
            <div class="dasmia-toolbar-group">
              <span class="dasmia-toolbar-label">Цветокоррекция:</span>
              <div class="dasmia-filter-slider-wrap">
                <label for="dasmia-slider-brightness">Яркость:</label>
                <input type="range" id="dasmia-slider-brightness" min="50" max="150" value="100" />
              </div>
              <div class="dasmia-filter-slider-wrap">
                <label for="dasmia-slider-contrast">Контраст:</label>
                <input type="range" id="dasmia-slider-contrast" min="50" max="150" value="100" />
              </div>
              <div class="dasmia-filter-slider-wrap">
                <label for="dasmia-slider-saturate">Насыщенность:</label>
                <input type="range" id="dasmia-slider-saturate" min="0" max="200" value="100" />
              </div>
            </div>
            <div class="dasmia-toolbar-group">
              <span class="dasmia-toolbar-label">Формат:</span>
              <select id="dasmia-export-format" style="background:#18181c;color:#fff;border:1px solid #444;border-radius:4px;padding:4px 8px;font-size:11px;">
                <option value="image/webp" selected>WebP (Оптимально)</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
          </div>
        </div>

        <div class="dasmia-modal-footer">
          <div id="dasmia-crop-dimensions" class="dasmia-crop-dimensions">
            Размер: <strong>--</strong>
          </div>
          <div style="display:flex;gap:10px;">
            <button type="button" class="dasmia-btn dasmia-btn-upload" id="dasmia-modal-cancel-btn">Отмена</button>
            <button type="button" class="dasmia-btn dasmia-btn-edit" id="dasmia-modal-apply-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Применить изменения
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind ratio buttons
    backdrop.querySelectorAll('.dasmia-ratio-pill[data-ratio]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        backdrop.querySelectorAll('.dasmia-ratio-pill[data-ratio]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (activeCropper) {
          const ratio = parseFloat(btn.getAttribute('data-ratio'));
          activeCropper.setAspectRatio(ratio);
        }
      });
    });

    // Transforms
    backdrop.querySelector('#dasmia-btn-rot-left').addEventListener('click', function () {
      if (activeCropper) activeCropper.rotate(-90);
    });
    backdrop.querySelector('#dasmia-btn-rot-right').addEventListener('click', function () {
      if (activeCropper) activeCropper.rotate(90);
    });
    backdrop.querySelector('#dasmia-btn-flip-h').addEventListener('click', function () {
      if (activeCropper) {
        flipH = -flipH;
        activeCropper.scaleX(flipH);
      }
    });
    backdrop.querySelector('#dasmia-btn-flip-v').addEventListener('click', function () {
      if (activeCropper) {
        flipV = -flipV;
        activeCropper.scaleY(flipV);
      }
    });
    backdrop.querySelector('#dasmia-btn-reset').addEventListener('click', function () {
      if (activeCropper) {
        activeCropper.reset();
        flipH = 1;
        flipV = 1;
        currentFilter = { brightness: 100, contrast: 100, saturate: 100 };
        backdrop.querySelector('#dasmia-slider-brightness').value = 100;
        backdrop.querySelector('#dasmia-slider-contrast').value = 100;
        backdrop.querySelector('#dasmia-slider-saturate').value = 100;
        updatePreviewFilters();
      }
    });

    // Sliders
    function updatePreviewFilters() {
      const b = backdrop.querySelector('#dasmia-slider-brightness').value;
      const c = backdrop.querySelector('#dasmia-slider-contrast').value;
      const s = backdrop.querySelector('#dasmia-slider-saturate').value;
      currentFilter = { brightness: b, contrast: c, saturate: s };
      const filterStr = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
      const viewImg = backdrop.querySelector('.cropper-view-box img');
      const wrapImg = backdrop.querySelector('.cropper-wrap-box img');
      if (viewImg) viewImg.style.filter = filterStr;
      if (wrapImg) wrapImg.style.filter = filterStr;
    }

    backdrop.querySelector('#dasmia-slider-brightness').addEventListener('input', updatePreviewFilters);
    backdrop.querySelector('#dasmia-slider-contrast').addEventListener('input', updatePreviewFilters);
    backdrop.querySelector('#dasmia-slider-saturate').addEventListener('input', updatePreviewFilters);

    // Close / Cancel
    backdrop.querySelector('#dasmia-modal-close-btn').addEventListener('click', closeModal);
    backdrop.querySelector('#dasmia-modal-cancel-btn').addEventListener('click', closeModal);

    // Apply
    backdrop.querySelector('#dasmia-modal-apply-btn').addEventListener('click', function () {
      if (!activeCropper || !activeWidget) return;

      const format = backdrop.querySelector('#dasmia-export-format').value;
      const rawCanvas = activeCropper.getCroppedCanvas({
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });

      if (!rawCanvas) {
        alert('Не удалось сформировать изображение.');
        return;
      }

      // Apply brightness/contrast/saturation onto final canvas
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = rawCanvas.width;
      finalCanvas.height = rawCanvas.height;
      const ctx = finalCanvas.getContext('2d');
      ctx.filter = `brightness(${currentFilter.brightness}%) contrast(${currentFilter.contrast}%) saturate(${currentFilter.saturate}%)`;
      ctx.drawImage(rawCanvas, 0, 0);

      finalCanvas.toBlob(function (blob) {
        if (!blob) return;

        let ext = 'webp';
        if (format === 'image/jpeg') ext = 'jpg';
        if (format === 'image/png') ext = 'png';

        const newFileName = `edited_${Date.now()}.${ext}`;
        const newFile = new File([blob], newFileName, { type: format });

        // Update real file input using DataTransfer
        const fileInput = activeWidget.querySelector('.dasmia-real-file-input');
        if (fileInput) {
          try {
            const dt = new DataTransfer();
            dt.items.add(newFile);
            fileInput.files = dt.files;
          } catch (err) {
            console.warn('DataTransfer not fully supported:', err);
          }
        }

        // Update UI preview
        const thumbImg = activeWidget.querySelector('.dasmia-image-thumb');
        if (thumbImg) {
          thumbImg.src = finalCanvas.toDataURL(format, 0.9);
          thumbImg.style.display = 'block';
        }

        const filenameEl = activeWidget.querySelector('.dasmia-filename');
        if (filenameEl) filenameEl.textContent = newFileName;

        const badgeEl = activeWidget.querySelector('.dasmia-badge');
        if (badgeEl) {
          badgeEl.textContent = `Отредактировано (${Math.round(blob.size / 1024)} KB)`;
          badgeEl.style.display = 'inline-block';
        }

        const clearCheckbox = activeWidget.querySelector('input[type="checkbox"][name$="-clear"]');
        if (clearCheckbox) clearCheckbox.checked = false;

        closeModal();
      }, format, 0.9);
    });

    return backdrop;
  }

  function closeModal() {
    if (activeCropper) {
      activeCropper.destroy();
      activeCropper = null;
    }
    if (activeModal) {
      activeModal.style.display = 'none';
      activeModal = null;
    }
    activeWidget = null;
  }

  // Keyboard shortcut Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && activeModal && activeModal.style.display !== 'none') {
      closeModal();
    }
  });

  // Init on DOM ready and dynamic changes (e.g. Django inlines add row)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageWidgets);
  } else {
    initImageWidgets();
  }

  // Support for dynamic inlines in Django admin
  if (typeof django !== 'undefined' && django.jQuery) {
    django.jQuery(document).on('formset:added', function () {
      setTimeout(initImageWidgets, 100);
    });
  }

  // MutationObserver fallback for inlines
  const observer = new MutationObserver(function () {
    initImageWidgets();
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();
