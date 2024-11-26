import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Spin } from "antd";

import router from "../router/router.js";
import { queryClient } from "../api/query-client.js";
import { AntdConfigProvider } from "../providers/antd-config-provider.js";
import ErrorBoundary from "../components/ErrorBoundary.js";

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
            <ErrorBoundary>
                <AntdConfigProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={createBrowserRouter(router)} />

                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </AntdConfigProvider>
            </ErrorBoundary>
        </Suspense>
    );
}

export default App;
