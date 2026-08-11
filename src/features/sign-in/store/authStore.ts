import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserData } from "./type.ts";

interface AuthState {
  token: string | null;
  userData: UserData | null;

  setAuth: (token: string, userData: UserData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userData: null,

      setAuth: (token: string, userData: UserData) => {
        set({
          token,
          userData,
        });
      },

      logout: () => {
        set({
          token: null,
          userData: null,
        });
      },
    }),
    {
      name: "user-auth",
      partialize: (state) => ({
        token: state.token,
        userData: state.userData,
      }),
    },
  ),
);

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const userData = useAuthStore((state) => state.userData);
  const logout = useAuthStore((state) => state.logout);

  const setAuth = useAuthStore((state) => state.setAuth);

  return {
    token,
    userData,
    logout,
    setAuth,
  };
};
