# usuarios/views.py
from rest_framework import viewsets, permissions
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data.get("access")
        print("Token generado:", token)  # Imprime el token en la consola del servidor
        return response


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def usuario_actual(request):
    print("Usuario:", request.user)  # Imprime el usuario
    serializer = UsuarioSerializer(request.user)
    return Response(serializer.data)
