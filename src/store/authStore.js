import { create } from "zustand";

export const useAuthStore = create((set) => ({
  session: null,
  userId: null,
  setSession: (session) => set({ session, userId: session?.user?.id ?? null }),
  clearSession: () => set({ session: null, userId: null }),
}));
