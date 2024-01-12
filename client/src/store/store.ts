import { create } from "zustand";

export const useAppStore = create<AppStoreProps>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  isModalOpen: false,
  setIsModalOpen: (open) => set({isModalOpen: open})
}));
