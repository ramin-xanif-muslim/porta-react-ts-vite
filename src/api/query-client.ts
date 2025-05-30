import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
            retry: false,
            // staleTime: 1 * 60 * 1000, 
            gcTime: 24 * 60 * 60 * 1000,
        }
    }
});
