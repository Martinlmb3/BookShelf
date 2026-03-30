import { useMutation, useQuery } from "@tanstack/react-query";
import { loginSchema } from "@/schemas/auth.schema";
import axios from "axios";
import api from "../api/axios";
interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}
//Todo:Ajouter les imports des schema 
// Auth mutations
export function useSignup() {
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await api.post("/api/auth/signup", data);
      return response.data;
    },
    onSuccess: (data) => {
      // Handle successful signup (e.g., save token)
      console.log("Signup successful:", data);
    },
    onError: (error: any) => {
      console.error("Signup error:", error.response?.data || error.message);
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post("/api/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    },
  });
}