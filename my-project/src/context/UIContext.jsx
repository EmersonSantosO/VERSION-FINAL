// src/UIContext.jsx
import React, { createContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isNavbarUpdated, setIsNavbarUpdated] = useState(false);

  const updateNavbar = () => {
    setIsNavbarUpdated(!isNavbarUpdated);
  };

  return (
    <UIContext.Provider value={{ isNavbarUpdated, updateNavbar }}>
      {children}
    </UIContext.Provider>
  );
};

export default UIContext;
