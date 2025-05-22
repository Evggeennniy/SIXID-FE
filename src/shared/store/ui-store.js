import { create } from "zustand";

export const useUIStore = create((set) => ({
  isNavOpen: false,
  isOptionsOpen: false,

  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  toggleOptions: (boolean) =>
    set((state) => ({ isOptionsOpen: boolean })),
  closeAll: () => set({ isNavOpen: false, isOptionsOpen: false }),
}));
