import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAppStore = create<
  AppStoreProps,
  [["zustand/persist", unknown]]
>(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      isModalOpen: false,
      setIsModalOpen: (open) => set({ isModalOpen: open }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({user: state.user}),
    }
  )
);
