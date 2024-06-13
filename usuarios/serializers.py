# usuarios/serializers.py
from rest_framework import serializers
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id",
            "email",
            "rut",  # Agrega el campo rut aquí
            "nombre",
            "apellido",
            "telefono",
            "jornada",
            "rol",
            "imagen",
        ]


class UsuarioCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "email",
            "password",
            "rut",  # Agrega el campo rut aquí
            "nombre",
            "apellido",
            "telefono",
            "jornada",
            "rol",
            "imagen",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Usuario(
            email=validated_data["email"],
            rut=validated_data["rut"],
            nombre=validated_data["nombre"],
            apellido=validated_data["apellido"],
            telefono=validated_data["telefono"],
            jornada=validated_data["jornada"],
            rol=validated_data["rol"],
            imagen=validated_data.get("imagen"),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
