import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./axios";

##TODO: add a book
#TODO: post a book
#TODO: delete a book
#TODO: update a book
#TODO: get user books
#TODO: get all books
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
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  image:string;
  year:Date;
  description:string;
}



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