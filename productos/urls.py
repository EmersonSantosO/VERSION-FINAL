# productos/urls.py
from django.urls import path
from .views import ProductoListCreateView, ProductoDetailView

urlpatterns = [
    path("productos/", ProductoListCreateView.as_view(), name="producto-list-create"),
    path("productos/<int:pk>/", ProductoDetailView.as_view(), name="producto-detail"),
]
