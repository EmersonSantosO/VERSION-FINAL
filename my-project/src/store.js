// store.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { jwtDecode } from "jwt-decode";

// Configurar la URL base de la API para Axios
axios.defaults.baseURL = API_BASE_URL;

// Función auxiliar para refrescar el token
async function refreshToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axios.post("/token/refresh/", {
      refresh: token.split(" ")[1],
    });
    const newToken = `Bearer ${response.data.access}`;
    localStorage.setItem("token", newToken);
    axios.defaults.headers.common["Authorization"] = newToken;
    return newToken;
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return null;
  }
}

const useStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  products: { results: [], count: 0, next: null, previous: null },
  users: [],
  navbarNeedsUpdate: false,

  // Función para inicializar el store (se ejecuta al cargar la aplicación)
  initializeStore: async () => {
    const token = localStorage.getItem("token");

    if (token && typeof token === "string") {
      // Elimina el prefijo 'Bearer' si está presente
      const tokenToDecode = token.startsWith("Bearer ")
        ? token.split(" ")[1]
        : token;

      // Decodifica el token sin el prefijo
      const decodedToken = jwtDecode(tokenToDecode);

      const expiryDate = new Date(decodedToken.exp * 1000);
      const now = new Date();

      // Si el token está a punto de expirar, refréscalo
      if (expiryDate - now < 60 * 1000) {
        // 1 minuto antes de la expiración
        const newToken = await refreshToken();
        if (!newToken) {
          // Si no se pudo refrescar el token, redirige al login
          set({ isLoggedIn: false, isLoading: false });
          return;
        }
      }

      // Configura la cabecera Authorization DESPUÉS del refresco del token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ isLoggedIn: true, isLoading: true });

      try {
        // Obtener datos del usuario después de iniciar sesión
        const userResponse = await axios.get("/usuarios/me/");

        set({
          user: userResponse.data,
          isLoggedIn: true,
          isLoading: false,
          navbarNeedsUpdate: true,
        });

        // Obtener productos y usuarios
        get().fetchProducts();
        get().fetchUsers();
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        set({ isLoggedIn: false, isLoading: false });
      }
    }
  },

  // Función para iniciar sesión
  login: async (username, password, toast) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        "/token/",
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

      const token = `Bearer ${response.data.access}`;
      localStorage.setItem("token", token);

      // Configurar la cabecera de autorización globalmente
      axios.defaults.headers.common["Authorization"] = token;

      // Obtener datos del usuario después de iniciar sesión
      const userResponse = await axios.get("/usuarios/me/");

      set({
        user: userResponse.data,
        isLoggedIn: true,
        isLoading: false,
        navbarNeedsUpdate: true,
      });

      // Obtener productos y usuarios
      get().fetchProducts();
      get().fetchUsers();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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

  // Función para cerrar sesión
  logout: () => {
    localStorage.removeItem("token");
    // Eliminar la cabecera de autorización
    delete axios.defaults.headers.common["Authorization"];
    set({
      user: null,
      isLoggedIn: false,
      products: { results: [], count: 0, next: null, previous: null },
      users: [],
      navbarNeedsUpdate: true,
    });
  },
  // Función para obtener productos (con paginación y búsqueda)
  fetchProducts: async (page = 1, search = "") => {
    set({ isLoading: true });
    try {
      const params = { page, search };
      const response = await axios.get("/productos/", { params });
      set({ products: response.data, isLoading: false });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      set({ isLoading: false });
    }
  },

  // Función para obtener usuarios
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/usuarios/");
      // Actualiza 'users' solo con el array de resultados
      if (Array.isArray(response.data.results)) {
        set({ users: response.data.results, isLoading: false });
      } else {
        console.error(
          "La respuesta de usuarios no es un array:",
          response.data
        );
        set({ isLoading: false, users: [] });
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      set({ isLoading: false, users: [] });
    }
  },

  // Función para eliminar un producto
  deleteProduct: async (productId) => {
    try {
      await axios.delete(`/productos/${productId}/`);
      // Actualizar la lista de productos en el estado
      set((state) => ({
        products: {
          ...state.products,
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
