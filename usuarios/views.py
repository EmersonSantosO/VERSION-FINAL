# usuarios/views.py
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from .models import Usuario
from .serializers import UsuarioSerializer, UsuarioCreateSerializer
from .permissions import IsAdminUser, IsAdminOrCreateUser
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.serializers import AuthTokenSerializer


class UsuarioListCreateView(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsAdminOrCreateUser]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return UsuarioCreateSerializer
        return UsuarioSerializer

    def perform_create(self, serializer):
        serializer.save()


class UsuarioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]


class CustomAuthToken(ObtainAuthToken):
    serializer_class = AuthTokenSerializer  # Configura el serializador

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        # Verifica la contraseña
        if not check_password(request.data["password"], user.password):
            return Response({"error": "Credenciales incorrectas"}, status=400)

        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "rol": user.rol,
            }
        )


class UsuarioMeView(generics.RetrieveAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
