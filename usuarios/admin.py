from django.contrib import admin
from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    # Campos que quieres mostrar en la lista de usuarios
    list_display = ("username", "email", "rut", "nombre", "apellido", "rol", "is_staff")
    # Campos por los que se puede buscar
    search_fields = ("username", "email", "rut", "nombre", "apellido")
    # Campos que se pueden filtrar
    list_filter = ("rol", "is_staff", "is_superuser", "is_active")
    # Campos que se mostrarán en un formulario horizontal al crear o editar un usuario
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            "Información personal",
            {"fields": ("rut", "nombre", "apellido", "telefono", "jornada", "imagen")},
        ),
        (
            "Permisos",
            {
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "is_active",
                    "groups",
                    "user_permissions",
                    "rol",
                )
            },
        ),
    )
    # Campos que se deben rellenar al crear un usuario
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password",
                    "rut",
                    "nombre",
                    "apellido",
                    "telefono",
                    "jornada",
                    "rol",
                ),
            },
        ),
    )
