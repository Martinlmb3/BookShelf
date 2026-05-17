import axios from "axios";

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";


    export const api = axios.create({
        baseURL: API_URL,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });
    function getCsrfToken(): string {
        return document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("XSRF-TOKEN="))
                        ?.split("=")[1] ?? "";
    }

    api.interceptors.request.use((config) => {
        if (["post", "put", "patch", "delete"].includes(config.method ?? "")) {
            config.headers["X-XSRF-TOKEN"] = getCsrfToken();
        }
        return config;
    });
    export default api;
