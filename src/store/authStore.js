import { create } from "zustand";

export const useAuthStore = create((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
}));
