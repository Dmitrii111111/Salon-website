from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='home'),
    path('policy/', policy, name='policy'),
    path('certificates/', certificates, name='certificates'),
]