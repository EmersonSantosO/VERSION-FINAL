# productos/views.py
from rest_framework import generics, permissions
from .models import Producto
from .serializers import ProductoSerializer
from usuarios.permissions import IsAdminOrVendedor
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.settings import api_settings


class ProductoListCreateView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrVendedor]
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["nombre", "descripcion", "codigo", "tipo"]


class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrVendedor]
