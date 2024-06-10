import { create } from "zustand";

const useStore = create((set) => ({
  products: [],
  users: [],
  setProducts: (newProducts) => set({ products: newProducts }),
  setUsers: (users) => set({ users }),
}));

export { useStore };
