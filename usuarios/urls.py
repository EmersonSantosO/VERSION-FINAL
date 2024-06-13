from django.urls import path
from .views import (
    UsuarioListCreateView,
    UsuarioDetailView,
    UsuarioMeView,
    CustomAuthToken,
)

urlpatterns = [
    path("usuarios/", UsuarioListCreateView.as_view(), name="usuario-list-create"),
    path("usuarios/<int:pk>/", UsuarioDetailView.as_view(), name="usuario-detail"),
    path("api-token-auth/", CustomAuthToken.as_view(), name="api_token_auth"),
    path("usuarios/me/", UsuarioMeView.as_view(), name="usuario-me"),
]
