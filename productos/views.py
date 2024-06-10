# productos/views.py
from rest_framework import generics, permissions
from .models import Producto
from .serializers import ProductoSerializer
from usuarios.permissions import IsAdminOrVendedor


class ProductoListCreateView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrVendedor]
