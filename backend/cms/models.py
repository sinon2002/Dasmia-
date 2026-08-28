from django.db import models
from django.utils.translation import gettext_lazy as _
from .utils import process_and_optimize_image

class ContentBlock(models.Model):
    key = models.CharField(max_length=100, unique=True, help_text="Unique identifier for the block (e.g., 'home_intro_title')")

    # These fields will be translated via modeltranslation (title_ru, title_ky, title_en, etc.)
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField(blank=True, null=True)

    image = models.ImageField(upload_to='cms/blocks/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.image:
            process_and_optimize_image(self.image, max_width=2560, max_height=2560)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.key

class Direction(models.Model):
    """Business domains (Banquets, Restaurant, Fitness, etc.)"""
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='cms/directions/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        if self.cover_image:
            process_and_optimize_image(self.cover_image, max_width=2560, max_height=2560)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class DirectionGalleryImage(models.Model):
    """Gallery images for each business direction bento grid"""
    SPAN_CHOICES = (
        ('normal', 'Обычный (1x1)'),
        ('wide', 'Широкий (2 колонки)'),
        ('tall', 'Высокий (2 строки)'),
    )
    direction = models.ForeignKey(Direction, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='cms/galleries/')
    title = models.CharField(max_length=255, blank=True, null=True, help_text="Подпись / Alt текст")
    span = models.CharField(max_length=20, choices=SPAN_CHOICES, default='normal')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['direction', 'order']
        verbose_name = 'Изображение галереи'
        verbose_name_plural = 'Галерея направления'

    def save(self, *args, **kwargs):
        if self.image:
            process_and_optimize_image(self.image, max_width=2560, max_height=2560)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.direction.name} - #{self.order} ({self.title or 'Без названия'})"

class Service(models.Model):
    """Services under a specific direction"""
    direction = models.ForeignKey(Direction, related_name='services', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    price_currency = models.CharField(max_length=10, default='KGS')

    class Meta:
        ordering = ['direction', 'name']

    def __str__(self):
        return f"{self.name} ({self.direction.name})"

class News(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    summary = models.TextField(blank=True, null=True)
    content = models.TextField()
    cover_image = models.ImageField(upload_to='cms/news/', blank=True, null=True)
    published_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-published_date']
        verbose_name_plural = 'News'

    def save(self, *args, **kwargs):
        if self.cover_image:
            process_and_optimize_image(self.cover_image, max_width=2560, max_height=2560)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class MediaAsset(models.Model):
    """General Media Assets Library for DASMIA website"""
    CATEGORY_CHOICES = (
        ('general', 'Общее'),
        ('banquet', 'Банкеты (Айкөл Ордо)'),
        ('restaurant', 'Ресторан & Гастрономия'),
        ('chaikhana', 'Чайхана'),
        ('ethno', 'Этно-село & Юрты'),
        ('pools', 'Бассейны & Аквазона'),
        ('spa', 'SPA & Оздоровление'),
        ('fitness', 'Фитнес-клуб'),
    )
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    image = models.ImageField(upload_to='cms/media_library/')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Медиа-файл'
        verbose_name_plural = 'Медиабиблиотека'

    def save(self, *args, **kwargs):
        if self.image:
            process_and_optimize_image(self.image, max_width=2560, max_height=2560)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} [{self.get_category_display()}]"
