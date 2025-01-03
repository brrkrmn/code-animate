import axios from "axios";
import { getSession } from "next-auth/react";

export const baseURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://code-animate-backend.vercel.app/";

export const backendService = axios.create({
  baseURL: baseURL,
});

backendService.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
