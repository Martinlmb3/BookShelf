import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { loginSchema, signupSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import api from "../api/axios";

export function useSignup() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
      const response = await api.post("/auth/signup", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
    },
    onError: (error: any) => {
      console.error("Signup error:", error.response?.data || error.message);
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    onError: (error: any) => {
      console.error("Login error:", error.response?.data || error.message);
    },
  });
}
