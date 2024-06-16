## productos/models.py
from django.db import models
from django.utils.translation import gettext_lazy as _


class Producto(models.Model):
    class TipoProducto(models.TextChoices):
        ASEO = "aseo", _("Aseo")
        BEBIDAS = "bebidas", _("Bebidas")
        CARNES = "carnes", _("Carnes")
        LACTEOS = "lacteos", _("Lacteos")
        PASTAS = "pastas", _("Pastas")
        SNACKS = "snacks", _("Snacks")
        OTROS = "otros", _("Otros")

    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    codigo = models.CharField(max_length=50, unique=True)
    tipo = models.CharField(max_length=20, choices=TipoProducto.choices)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to="productosImagenes", null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
