from django import forms
from django.utils.safestring import mark_safe
from django.utils.html import escape

class AdminImageEditorWidget(forms.ClearableFileInput):
    """
    Custom Django Admin Widget that provides:
    - Real-time thumbnail preview
    - Interactive Cropper.js modal (Crop, Rotate, Flip, Color adjust, WebP export)
    - Clean replaced file handling
    """

    class Media:
        css = {
            'all': (
                'cms/css/cropper.min.css',
                'cms/css/image_editor.css',
            )
        }
        js = (
            'cms/js/cropper.min.js',
            'cms/js/image_editor.js',
        )

    def render(self, name, value, attrs=None, renderer=None):
        attrs = attrs or {}
        attrs['class'] = (attrs.get('class', '') + ' dasmia-real-file-input').strip()
        
        # Base file input from Django
        real_input_html = super().render(name, value, attrs=attrs, renderer=renderer)
        
        has_file = bool(value and hasattr(value, 'url'))
        image_url = escape(value.url) if has_file else ''
        file_name = escape(str(value).split('/')[-1]) if has_file else 'Нет файла'
        
        thumb_style = '' if has_file else 'display:none;'
        badge_style = '' if has_file else 'display:none;'
        edit_btn_style = '' if has_file else 'display:none;'
        
        widget_id = attrs.get('id', f'id_{name}')
        
        html = f"""
        <div class="dasmia-image-widget" id="widget_{widget_id}">
            <div class="dasmia-image-preview-box">
                <div class="dasmia-image-thumb-wrap">
                    <img class="dasmia-image-thumb" src="{image_url}" alt="Preview" style="{thumb_style}" />
                </div>
                <div class="dasmia-image-meta">
                    <div class="dasmia-filename">{file_name}</div>
                    <div class="dasmia-badge" style="{badge_style}">Загружено</div>
                </div>
            </div>
            
            <div class="dasmia-image-actions">
                <button type="button" class="dasmia-btn dasmia-btn-upload">
                    📁 {"Заменить" if has_file else "Выбрать фото"}
                </button>
                <button type="button" class="dasmia-btn dasmia-btn-edit" style="{edit_btn_style}">
                    ✂️ Редактировать / Кадрировать
                </button>
                {f'''<button type="button" class="dasmia-btn dasmia-btn-clear">
                    ❌ Удалить
                </button>''' if has_file else ''}
            </div>
            
            <div style="display:none;">
                {real_input_html}
            </div>
        </div>
        """
        return mark_safe(html)
