import { create } from "zustand";

interface AppState {
  userName: string;
  setUserName: (name: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  userName: "User",
  setUserName: (name) => set({ userName: name }),
  theme: "light",
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
