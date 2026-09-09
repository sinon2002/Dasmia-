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
        
        has_file = bool(value and hasattr(value, 'url') and getattr(value, 'name', None))
        if has_file:
            ts = ''
            inst = getattr(value, 'instance', None)
            if inst:
                for attr in ('updated_at', 'published_date', 'created_at'):
                    val = getattr(inst, attr, None)
                    if val and hasattr(val, 'timestamp'):
                        ts = f"?v={int(val.timestamp())}"
                        break
            if not ts and hasattr(value, 'storage') and value.name:
                try:
                    mtime = int(value.storage.get_modified_time(value.name).timestamp())
                    ts = f"?v={mtime}"
                except Exception:
                    pass
            image_url = f"{escape(value.url)}{ts}"
        else:
            image_url = ''
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
            
            <div style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
                {real_input_html}
            </div>
        </div>
        """
        return mark_safe(html)
