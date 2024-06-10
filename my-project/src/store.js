// store.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

axios.defaults.baseURL = API_BASE_URL;

const useStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  products: [],
  users: [],
  navbarNeedsUpdate: false,

  initializeStore: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ isLoggedIn: true, isLoading: true });
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        const [userResponse, productsResponse, usersResponse] =
          await Promise.all([
            axios.get("/usuarios/me/"),
            axios.get("/productos/"),
            axios.get("/usuarios/"),
          ]);

        set({
          user: userResponse.data,
          products: productsResponse.data,
          users: usersResponse.data,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error loading data:", error);
        set({ isLoggedIn: false, isLoading: false });
      }
    }
  },

  login: async (username, password, toast) => {
    set({ isLoading: true });
    try {
      console.log("Nombre de usuario:", username);
      console.log("Contraseña:", password);
      const response = await axios.post(
        "/api-token-auth/",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      // Configura el token en los headers de Axios
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      // Ahora puedes hacer las otras peticiones
      const [userResponse, productsResponse, usersResponse] = await Promise.all(
        [
          axios.get("/usuarios/me/"),
          axios.get("/productos/"),
          axios.get("/usuarios/"),
        ]
      );

      set({
        user: userResponse.data,
        products: productsResponse.data,
        users: usersResponse.data,
        isLoggedIn: true,
        isLoading: false,
        navbarNeedsUpdate: true,
      });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      set({ isLoading: false });
      toast({
        title: "Error de inicio de sesión",
        description:
          error.response?.data?.detail || "Credenciales incorrectas.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    set({
      user: null,
      isLoggedIn: false,
      products: [],
      users: [],
      navbarNeedsUpdate: true,
    });
  },

  fetchProducts: async (page = 1, search = "") => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      const params = { page, search };
      const response = await axios.get("/productos/", {
        headers: { Authorization: `Token ${token}` },
        params,
      });
      set({
        products: response.data, // Guarda la respuesta completa, incluyendo la paginación
        isLoading: false,
      });
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

  deleteProduct: async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/productos/${productId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      set((state) => ({
        products: {
          ...state.products, // Mantén las otras propiedades del objeto products
          results: state.products.results.filter(
            (product) => product.id !== productId
          ),
        },
      }));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  },
}));

export default useStore;
