import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-app") || "fantasy",
  setTheme: (theme) => {
    localStorage.setItem("chat-app", theme);
    set({theme});
  },
}));