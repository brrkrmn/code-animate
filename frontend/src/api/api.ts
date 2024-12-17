import axios from "axios";
import { getSession } from "next-auth/react";

export const baseURL = process.env.BASE_URL;

export const backendService = axios.create({
  baseURL: baseURL,
});

backendService.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.access_token;
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});
