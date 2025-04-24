// src/lib/axiosInstance.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "@/store/page";
import { setUser, clearUser } from "@/store/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import type { InternalAxiosRequestConfig } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Adaugă tokenul la fiecare request
axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && request.headers) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);


// Răspuns + logica de refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${apiUrl}/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data as { accessToken: string };

        if (!accessToken) throw new Error("Missing access token");

        const user = jwtDecode(accessToken);
        store.dispatch(setUser({ user }));
        localStorage.setItem("accessToken", accessToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        store.dispatch(clearUser());
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
