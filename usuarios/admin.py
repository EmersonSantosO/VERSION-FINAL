from django.contrib import admin
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Usuario
from rest_framework.authtoken.models import Token


class UsuarioCreationForm(forms.ModelForm):
    """
    Formulario para crear nuevos usuarios. Incluye todos los campos requeridos,
    más una repetición del password.
    """

    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password confirmation", widget=forms.PasswordInput
    )

    class Meta:
        model = Usuario
        fields = (
            "username",
            "email",
            "rut",
            "nombre",
            "apellido",
            "telefono",
            "jornada",
            "imagen",
            "rol",
        )

    def clean_password2(self):
        # Comprueba que los dos passwords coinciden
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Guarda el password en formato hash
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UsuarioChangeForm(forms.ModelForm):
    """
    Formulario para actualizar usuarios. Incluye todos los campos del usuario,
    pero reemplaza el campo de password con uno de sólo lectura.
    """

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = Usuario
        fields = (
            "username",
            "email",
            "password",
            "rut",
            "nombre",
            "apellido",
            "telefono",
            "jornada",
            "imagen",
            "rol",
            "is_active",
            "is_staff",
        )

    def clean_password(self):
        # Independientemente de lo que el usuario provea, devolver el valor inicial.
        return self.initial["password"]


@admin.register(Usuario)
class UsuarioAdmin(BaseUserAdmin):
    form = UsuarioChangeForm
    add_form = UsuarioCreationForm

    list_display = ("username", "email", "rut", "nombre", "apellido", "rol", "is_staff")
    search_fields = ("username", "email", "rut", "nombre", "apellido")
    list_filter = ("rol", "is_staff", "is_superuser", "is_active")
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            "Información personal",
            {"fields": ("rut", "nombre", "apellido", "telefono", "jornada", "imagen")},
        ),
        ("Permisos", {"fields": ("rol", "is_staff", "is_superuser", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
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
    ordering = ("username",)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if not change:  # Solo crea un token si es un nuevo usuario
            Token.objects.create(user=obj)
