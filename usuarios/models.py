from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


class UsuarioManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class Usuario(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

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

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UsuarioManager()

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
