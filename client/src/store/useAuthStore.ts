import { create } from "zustand";
import axios from "axios";
import { API_ROUTE, AuthStore } from "@/utils/api";
import { persist } from "zustand/middleware";
const axiosInstance = axios.create({
  baseURL: API_ROUTE.auth_URL,
  withCredentials: true,
});

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      error: null,
      isLoading: false,
      user: null,
      register: async ({ email, name, password }) => {
        set({
          isLoading: true,
          error: null,
        });
        try {
          const response = await axiosInstance.post("/register", {
            email,
            name,
            password,
          });
          set({ isLoading: false, error: null });
          console.log("response from controller :", response);

          return {
            success: true,
            message: "User Registred successfully",
            data: response.data,
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error?.response?.data?.error || "Registration failed"
              : "Registration failed",
          });
          return {
            success: false,
            message: "Registration Failed",
            error: error,
          };
        }
      },
      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/login", {
            email,
            password,
          });

          set({ isLoading: false, error: null, user: response.data.user });
          return {
            success: response.data.success || true,
            message: response.data.message || "User Logged-In successfully",
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.error || "Login Failed"
              : "Login Failed",
            user: null,
          });
          return {
            success: false,
            message: "Login Failed",
            error: error,
          };
        }
      },
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/logout");
          set({ user: null, isLoading: false });
          return { success: true, message: "User Logged Out" };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.error || "Logout Failed"
              : "Logout Failed",
          });
          return { success: false, message: "Logout failed" };
        }
      },
      refreshAccessToken: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/refreshToken");
          set({ isLoading: false, error: null });
          return {
            success: true,
            message: "token issued successfully",
          };
        } catch (error) {
          set({
            isLoading: false,
            error: axios.isAxiosError(error)
              ? error.response?.data.error || "failed token issuance "
              : "failed token issuance ",
          });
          return {
            success: false,
            message: "failed token issuance",
            error: error,
          };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
export default useAuthStore;
