import axios from "axios";

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message ?? error.message ?? "An unexpected error occurred",
      statusCode: error.response?.status ?? 0,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(apiError);
  }
);

export default apiClient;
