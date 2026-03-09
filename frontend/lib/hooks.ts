import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import { z } from "zod";

// Types
interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  image:string;
  year:Date;
  description:string;
}

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

// Book queries
export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await api.get<Book[]>("/api/books");
      return response.data;
    },
  });
}

export function useBook(id: number) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await api.get<Book>(`/api/books/${id}`);
      return response.data;
    },
    enabled: !!id, // Only fetch if id exists
  });
}

export function useCreateBook() {
  return useMutation({
    mutationFn: async (bookData: Omit<Book, "id">) => {
      const response = await api.post("/api/books", bookData);
      return response.data;
    },
  });
}

export function useUpdateBook() {
  return useMutation({
    mutationFn: async ({ id, ...bookData }: Partial<Book> & { id: number }) => {
      const response = await api.put(`/api/books/${id}`, bookData);
      return response.data;
    },
  });
}

export function useDeleteBook() {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/books/${id}`);
      return response.data;
    },
  });
}

// AI Book Summary
interface BookSummaryRequest {
  title: string;
  author?: string;
  genre?: string;
  description?: string;
}

interface BookSummaryResponse {
  summary: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export function useGenerateBookSummary() {
  return useMutation({
    mutationFn: async (bookData: BookSummaryRequest) => {
      const response = await fetch("/api/book-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate summary");
      }

      return response.json() as Promise<BookSummaryResponse>;
    },
  });
}
