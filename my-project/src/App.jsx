import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthNavigation from "./components/AuthNavigation";
import Navbar from "./components/Navbar"; // <--- Importa Navbar

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/*" element={<AuthNavigation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
