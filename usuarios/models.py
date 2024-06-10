from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.auth.hashers import check_password
from django.utils.translation import gettext_lazy as _


class UsuarioManager(UserManager):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = self.get(username=username)
        except Usuario.DoesNotExist:
            return None

        if not check_password(password, user.password):
            return None

        return user


class Usuario(AbstractUser):
    username = models.CharField(max_length=150, unique=True)

    class Rol(models.TextChoices):
        VENDEDOR = "vendedor", _("Vendedor")
        ADMINISTRADOR = "administrador", _("Administrador")

    rut = models.CharField(max_length=13, unique=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    telefono = models.CharField(max_length=15)
    jornada = models.CharField(
        max_length=10,
        choices=[
            ("diurno", "Diurno"),
            ("vespertino", "Vespertino"),
            ("mixto", "Mixto"),
        ],
        default="diurno",
    )
    rol = models.CharField(max_length=15, choices=Rol.choices, default=Rol.VENDEDOR)
    imagen = models.ImageField(upload_to="usuarios/", null=True, blank=True)

    objects = UsuarioManager()  # Usa el administrador personalizado

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
