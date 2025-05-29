from django.contrib import admin
from django.urls import path
from minhaapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),  # Rota para uma view personalizada
]   