import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";
axios.defaults.baseURL = API_BASE_URL;

const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Agrega isLoading

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/usuarios/me/", {
            headers: { Authorization: `Token ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false); // Actualiza isLoading al final
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password, toast) => {
    console.log("Datos de inicio de sesión:", { email, password }); // Imprime los datos

    try {
      const response = await axios.post("/api-token-auth/", {
        username,
        password,
      });

      console.log("Respuesta del backend:", response); // Imprime la respuesta

      // Guarda el token en localStorage
      localStorage.setItem("token", response.data.token);

      // Actualiza el estado del usuario
      setUser(response.data);
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);

      // Manejo de errores: Mostrar un mensaje al usuario
      if (error.response) {
        // El servidor respondió con un código de estado diferente a 2xx
        console.error("Datos de la respuesta de error:", error.response.data);
        // Puedes usar un toast o un alert para mostrar el error al usuario:
        toast({
          title: "Error de inicio de sesión",
          description:
            error.response.data.detail || "Credenciales incorrectas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("La solicitud no recibió respuesta:", error.request);
        toast({
          title: "Error de inicio de sesión",
          description: "No se pudo conectar con el servidor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Algo sucedió al configurar la solicitud que provocó un error
        console.error("Error al configurar la solicitud:", error.message);
        toast({
          title: "Error de inicio de sesión",
          description: "Hubo un error al procesar la solicitud.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
