# usuarios/urls.py
from django.urls import path
from .views import UsuarioListCreateView, UsuarioDetailView, UsuarioMeView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("usuarios/", UsuarioListCreateView.as_view(), name="usuario-list-create"),
    path("usuarios/<int:pk>/", UsuarioDetailView.as_view(), name="usuario-detail"),
    path("api-token-auth/", obtain_auth_token, name="api_token_auth"),
    path("usuarios/me/", UsuarioMeView.as_view(), name="usuario-me"),
]
