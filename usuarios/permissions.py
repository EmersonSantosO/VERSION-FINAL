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
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.rol in ["administrador", "vendedor"]


class IsAdminOrCreateUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            return request.user and request.user.rol == "administrador"
        return request.user and request.user.rol in ["administrador", "vendedor"]
