import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

axios.defaults.baseURL = API_BASE_URL;

const useStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  usersLoading: false,
  products: [],
  users: [],
  ventas: [],
  clientes: [],
  navbarNeedsUpdate: false,

  initializeStore: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      set({ isLoading: true }); // Establece isLoading en true al inicio
      try {
        const userResponse = await axios.get("/usuarios/me/");
        set({ user: userResponse.data, isLoggedIn: true });
      } catch (error) {
        console.error("Error loading user data:", error);
        localStorage.removeItem("token");
        set({ isLoggedIn: false });
      } finally {
        set({ isLoading: false }); // Establece isLoading en false al final
      }
    }
  },
  login: async (username, password, toast, navigate) => {
    set({ isLoading: true }); // Comienza la carga
    try {
      const response = await axios.post("/api-token-auth/", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      const userResponse = await axios.get("/usuarios/me/");

      // Actualiza el estado con la información del usuario
      set({
        user: userResponse.data,
        isLoggedIn: true,
        navbarNeedsUpdate: true,
        isLoading: false, // Termina la carga después de obtener la información del usuario
      });

      // Redirige después de actualizar el estado
      navigate("/");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      set({ isLoading: false }); // Termina la carga en caso de error
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
      ventas: [],
      clientes: [],
      navbarNeedsUpdate: true,
    });
  },

  // Dentro de useStore
  // En useStore.js
  fetchProducts: async (page = 1, search = "") => {
    try {
      const response = await axios.get("/productos/", {
        params: { page, search },
      });
      console.log("Respuesta del backend:", response);
      set({ products: response.data.results || [] });
      return Promise.resolve(response.data.results); // Devuelve una promesa
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return Promise.reject(error); // Rechaza la promesa en caso de error
    }
  },

  fetchUsers: async () => {
    set({ usersLoading: true });
    try {
      const response = await axios.get("/usuarios/");
      set({ users: response.data.results || [], usersLoading: false });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      set({ usersLoading: false });
    }
  },

  deleteUser: async (userId) => {
    try {
      await axios.delete(`/usuarios/${userId}/`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      await axios.delete(`/productos/${productId}/`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      }));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  },

  addVenta: (venta) => {
    set((state) => ({
      ventas: [...state.ventas, { ...venta, id: state.ventas.length + 1 }],
    }));
  },

  deleteVenta: (ventaId) => {
    set((state) => ({
      ventas: state.ventas.filter((venta) => venta.id !== ventaId),
    }));
  },

  addCliente: (cliente) => {
    set((state) => ({
      clientes: [
        ...state.clientes,
        { ...cliente, id: state.clientes.length + 1 },
      ],
    }));
  },

  deleteCliente: (clienteId) => {
    set((state) => ({
      clientes: state.clientes.filter((cliente) => cliente.id !== clienteId),
    }));
  },
}));

export default useStore;
