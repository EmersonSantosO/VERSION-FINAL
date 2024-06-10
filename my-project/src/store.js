import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

axios.defaults.baseURL = API_BASE_URL;

const useStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false, // Nuevo estado para la carga
  products: [],
  users: [],

  login: async (username, password, toast) => {
    console.log("Datos de inicio de sesión:", { username, password });
    set({ isLoading: true }); // Iniciar la carga

    try {
      const response = await axios.post("/api-token-auth/", {
        username,
        password,
      });

      console.log("Respuesta del backend:", response);

      localStorage.setItem("token", response.data.token);
      set({ user: response.data, isLoggedIn: true, isLoading: false }); // Actualizar el estado
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      set({ isLoading: false }); // Detener la carga en caso de error

      if (error.response) {
        console.error("Datos de la respuesta de error:", error.response.data);
        toast({
          title: "Error de inicio de sesión",
          description:
            error.response.data.detail || "Credenciales incorrectas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (error.request) {
        console.error("La solicitud no recibió respuesta:", error.request);
        toast({
          title: "Error de inicio de sesión",
          description: "No se pudo conectar con el servidor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
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
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isLoggedIn: false });
  },
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/productos/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      set({ products: response.data, isLoading: false });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      set({ isLoading: false });
    }
  },
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/usuarios/", {
        headers: { Authorization: `Token ${token}` },
      });
      set({ users: response.data, isLoading: false });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      set({ isLoading: false });
    }
  },
}));

export default useStore;
