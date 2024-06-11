from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class Usuario(AbstractUser):
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

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
