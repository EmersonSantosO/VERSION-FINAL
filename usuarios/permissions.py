# usuarios/permissions.py
from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.rol == "administrador"


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.rol == "administrador"


class IsAdminOrVendedor(permissions.BasePermission):
    def has_permission(self, request, view):
        # Permitir acceso de solo lectura a todos
        if request.method in permissions.SAFE_METHODS:
            return True
        # Permitir acceso completo a administradores y vendedores
        return request.user and request.user.rol in ["administrador", "vendedor"]
