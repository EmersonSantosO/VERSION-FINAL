from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from usuarios import views as usuarios_views
from productos import views as productos_views

# ... para servir archivos multimedia durante el desarrollo
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r"usuarios", usuarios_views.UsuarioViewSet)
router.register(r"productos", productos_views.ProductoViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path(
        "api/token/",
        usuarios_views.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "api/usuarios/me/", usuarios_views.usuario_actual, name="usuario_actual"
    ),  # Fuera del router
]

# ... para servir archivos multimedia durante el desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
