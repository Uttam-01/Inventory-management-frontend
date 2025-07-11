import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  roles: string[]; 
  userName: string | null;
  setRoles: (roles: string[]) => void;
  setUserName: (userName: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      roles: [],
      userName: null,
      setRoles: (roles) => set({ roles }),
      setUserName: (userName) => set({ userName }),
      clearAuth: () => set({ roles: [], userName: null }),
    }),
    {
      name: "auth-storage", 
    }
  )
);
