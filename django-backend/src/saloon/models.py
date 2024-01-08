from django.db import models


                      # Не изменяемый контент
class Immutable_content(models.Model):
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    content = models.TextField(blank=True, verbose_name="Текст")

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = 'Не изменяемый контент'
        verbose_name_plural = '5) Не изменяемый контент'


                        # Изменяемый контент
                            # Прайс_лист
class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True, verbose_name="Категория")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория прайс-лист'
        verbose_name_plural = '1.1) Категории прайс-лист'
        ordering = ['id']

class Subcategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories', verbose_name="Категории")
    name = models.CharField(max_length=255, verbose_name="Название подкатегории")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Подкатегория прайс-лист'
        verbose_name_plural = '1.2) Подкатегории прайс-лист'


# готовая модель для цены от и до, до можно не вводить(цена в формате числа int)
class PriceList(models.Model):
    subcategory = models.ForeignKey(Subcategory, on_delete=models.PROTECT, verbose_name="Подкатегории")
    service_title = models.CharField(max_length=255, verbose_name="Название процедуры")
    min_price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Минимальная цена")
    max_price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Максимальная цена", null=True,
                                    blank=True)
    class Meta:
        verbose_name = 'Прайс-лист'
        verbose_name_plural = '1) Прайс-лист'


 # Фото контент тобовление через админку не доделал надо разбираться

class ImageCategory(models.Model):
    name = models.CharField(max_length=255, verbose_name="Категория")

    class Meta:
        verbose_name = 'Категории фото'
        verbose_name_plural = '2.1) Категория фото'

    def __str__(self):
        return self.name

class Image(models.Model):
    category = models.ForeignKey(ImageCategory, on_delete=models.CASCADE, verbose_name="Категория")
    image = models.ImageField(upload_to="photos/%Y/%m/%d", verbose_name="Фото работ")

    class Meta:
        verbose_name = 'Фото работ'
        verbose_name_plural = '2) Фото работ'

    def __str__(self):
        return str(self.image)

           # Политика конфиденциальности
# 1. В модели PrivacyPolicy записывать title
#    (название политики конфиденциальности)
#    и description (описание политики конфиденциальности).
# 2. В модели DataCollection записывать policy
#    (ссылка на политику конфиденциальности, к которой относится сбор данных)
#    и data (информация о данных, подлежащих сбору).
# 3. В модели ThirdPartyDataTransfer записывать policy
#    (ссылка на политику конфиденциальности, к которой относится передача данных)
#    и reason (причина передачи данных третьим лицам).


# для представления самой политики конфиденциальности
class PrivacyPolicy(models.Model):
    title = models.CharField(max_length=200, verbose_name="название политики конфиденциальности")
    description = models.TextField(verbose_name="описание политики конфиденциальности")

    class Meta:
        verbose_name = 'Политика конфиденциальности'
        verbose_name_plural = 'Политика конфиденциальности'

    def __str__(self):
        return str(self.title)

#  хранить данные о сборе информации
class DataCollection(models.Model):
    policy = models.ForeignKey(PrivacyPolicy, on_delete=models.CASCADE, verbose_name="ссылка на политику конфиденциальности, к которой относится сбор данных")
    data = models.TextField(max_length=200, verbose_name="Данные, подлежащие сбору")

    class Meta:
        verbose_name = 'Политика конфиденциальности, данные подлежащие сбору'
        verbose_name_plural = '4) Политика конфиденциальности, данные подлежащие сбору'

    def __str__(self):
        return str(self.data)

# хранить информацию о передаче данных третьим лицам.
class ThirdPartyDataTransfer(models.Model):
    policy = models.ForeignKey(PrivacyPolicy, on_delete=models.CASCADE, verbose_name="ссылка на политику конфиденциальности, к которой относится передача данных")
    reason = models.TextField(verbose_name="причина передачи данных третьим лицам")

    class Meta:
        verbose_name = 'Политика конфиденциальности, причины передачи данных третьим лицам'
        verbose_name_plural = '4) Политика конфиденциальности, причина передачи данных третьим лицам'
        ordering = ['id']

    def __str__(self):
        return str(self.reason)


            # Сертификаты
class Certificates(models.Model):
    image = models.ImageField(upload_to="photos/certificates", verbose_name="Сертификаты")

    class Meta:
        verbose_name = 'Сертификаты'
        verbose_name_plural = '3) Сертификаты'

    def __str__(self):
        return str(self.image)


            # для описания сайте <meta name="description" content=
class SiteContent(models.Model):
    page_name = models.CharField(max_length=80, unique=True, help_text="О чем текст", verbose_name="Название")
    description = models.TextField(help_text="Содержимое для мета-тега description", verbose_name="Контент")

    class Meta:
        verbose_name = 'Текст мета-тега'
        verbose_name_plural = '6) Для мета-тега'

    def __str__(self):
        return self.page_name