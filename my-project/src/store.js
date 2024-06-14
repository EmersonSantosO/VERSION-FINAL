import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

axios.defaults.baseURL = API_BASE_URL;

const useStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  usersLoading: false,
  products: [],
  users: [],
  navbarNeedsUpdate: false,

  initializeStore: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      set({ isLoading: true });
      try {
        const userResponse = await axios.get("/usuarios/me/");
        set({
          user: userResponse.data,
          isLoggedIn: true,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error loading user data:", error);
        localStorage.removeItem("token");
        set({ isLoggedIn: false, isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },

  login: async (username, password, toast, navigate) => {
    set({ isLoading: true });
    try {
      const response = await axios.post("/api-token-auth/", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      const userResponse = await axios.get("/usuarios/me/");
      set({
        user: userResponse.data,
        isLoggedIn: true,
        isLoading: false,
        navbarNeedsUpdate: true,
      });

      navigate("/"); // Redirecciona después de iniciar sesión
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
      const params = { page, search };
      const response = await axios.get("/productos/", { params });
      set({
        products: response.data.results || [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      set({ isLoading: false });
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
}));

export default useStore;
