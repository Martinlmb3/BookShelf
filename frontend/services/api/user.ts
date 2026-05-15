import { useQuery } from "@tanstack/react-query";
import api from "./axios";

async function getMe() {
    const response = await api.get("/users/me");
    return response.data;
}

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}