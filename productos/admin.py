from django.contrib import admin
from .models import Producto


# Registra el modelo Producto en el panel de administración
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    # Campos a mostrar en la lista de productos
    list_display = ("nombre", "codigo", "tipo", "precio", "fecha_creacion")

    # Campos por los que se puede filtrar la lista de productos
    list_filter = ("tipo", "fecha_creacion")

    # Campos para buscar productos
    search_fields = ("nombre", "codigo")
