// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/usuarios/me/");
      setUser(response.data);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      if (error.response && error.response.status === 404) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      fetchUser();
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/api-token-auth/", {
        username: email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data.token}`;
      await fetchUser();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.error("Error en la solicitud:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { AuthContext, AuthProvider };
