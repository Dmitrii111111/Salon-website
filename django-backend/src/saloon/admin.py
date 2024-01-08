from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import *


                    # Не изменяемый контент
class Immutable_contentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'content')
    search_fields = ('title', 'content')


                    # Таблица ПРАЙС ЛИСТ
class PriceListAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'subcategory', 'service_title', 'min_price', 'max_price')
    list_display_links = ('id', 'service_title')
    search_fields = ('service_title', 'min_price', 'max_price')
    list_filter = ('subcategory', 'min_price', 'max_price')
    list_editable = ('min_price', 'max_price')

    def category(self, obj):
        return obj.subcategory.category

    category.short_description = 'Категория'

class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'name')
    list_display_links = ('id', 'category', 'name')
    search_fields = ('name',)
    list_filter = ('category',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')


           # Таблица ЗАГРУЗКИ ИЗОБРАЖЕНИЙ РАБОТ

class ImageCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'get_html_photo')
    list_display_links = ('id', 'category')
    list_filter = ('category',)
    fields = ('category', 'image', 'get_html_photo')
    readonly_fields = ('get_html_photo',)

    def get_html_photo(self, object):
        if object.image:
            return mark_safe(f"<img src='{object.image.url}'width=40")

    get_html_photo.short_description = 'изображение'


                 # Политика конфиденциальности
class PrivacyPolicyAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')
    list_display_links = ('title', 'description')

class DataCollectionAdmin(admin.ModelAdmin):
    list_display = ('policy', 'data')
    list_display_links = ('policy', 'data')

class ThirdPartyDataTransferAdmin(admin.ModelAdmin):
    list_display = ('policy', 'reason')
    list_display_links = ('policy', 'reason')

    # Сертификаты
class CertificatesAdmin(admin.ModelAdmin):
    list_display = ('get_html_photo',)
    list_display_links = ('get_html_photo',)
    fields = ('image', 'get_html_photo')
    readonly_fields = ('get_html_photo',)


    def get_html_photo(self, object):
        if object.image:
            return mark_safe(f"<img src='{object.image.url}'width=100")

    get_html_photo.short_description = 'изображение'

    # для описания сайте <meta>
class SiteContentAdmin(admin.ModelAdmin):
    list_display = ('page_name', 'description')


admin.site.register(Immutable_content, Immutable_contentAdmin)
admin.site.register(PriceList, PriceListAdmin)
admin.site.register(Subcategory, SubcategoryAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(ImageCategory, ImageCategoryAdmin)
admin.site.register(Image, ImageAdmin)

admin.site.register(PrivacyPolicy, PrivacyPolicyAdmin)  # политека конф первая табличка

admin.site.register(DataCollection, DataCollectionAdmin)
admin.site.register(ThirdPartyDataTransfer, ThirdPartyDataTransferAdmin)
admin.site.register(Certificates, CertificatesAdmin)
admin.site.register(SiteContent, SiteContentAdmin)

admin.site.site_title = 'Queen Cosmo'
admin.site.site_header = 'Админ-панель: Queen Cosmo'
