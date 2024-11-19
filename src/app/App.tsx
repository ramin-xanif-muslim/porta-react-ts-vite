import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "../router/router.js";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spin } from "antd";
const queryClient = new QueryClient();

function App() {
    return (
        <Suspense
            fallback={
                <div className="loading">
                    <Spin tip="Loading" size="large">
                        <img
                            className="w-[93px] h-[32px]"
                            src="/logo.svg"
                            alt="logo"
                        />
                    </Spin>
                </div>
            }
        >
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={createBrowserRouter(router)} />
            </QueryClientProvider>
        </Suspense>
    );
}

export default App;
