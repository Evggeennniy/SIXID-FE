import { create } from "zustand";

export const useUIStore = create((set) => ({
  isNavOpen: false,
  isOptionsOpen: false,

  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  toggleOptions: () =>
    set((state) => ({ isOptionsOpen: !state.isOptionsOpen })),
  closeAll: () => set({ isNavOpen: false, isOptionsOpen: false }),
}));
