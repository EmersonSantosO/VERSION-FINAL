from django.contrib import admin
from .models import Usuario

# Registra el modelo Usuario en el panel de administración


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    # Campos a mostrar en la lista de usuarios
    list_display = ("username", "email", "first_name", "last_name", "is_staff")

    # Campos por los que se puede filtrar la lista de usuarios
    list_filter = ("is_staff", "is_active")

    # Campos para buscar usuarios
    search_fields = ("username", "email")
