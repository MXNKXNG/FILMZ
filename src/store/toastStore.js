import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],
  show: (toast) => {
    const id = ++count;
    const time = toast.time ?? 2000;
    set((s) => ({ toasts: [...s.toasts, { id, ...toast }] }));
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      time
    );
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
let count = 0;
