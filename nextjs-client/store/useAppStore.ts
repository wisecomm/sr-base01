import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/types";

interface AppState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      theme: "light",
      toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "app-storage", // localStorage key
    }
  )
);
