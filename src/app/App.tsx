import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Spin } from "antd";

import router from "../router/router";
import { queryClient } from "../api/query-client";
import { AntdConfigProvider } from "../providers/antd-config-provider";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ModalProvider from "../providers/modal-provider";
import { AuthProvider } from "../auth/AuthProvider";

function App() {
  return (
    <Suspense
      fallback={
        <div className="loading">
          <Spin tip="Loading" size="large">
            <img className="h-[32px] w-[93px]" src="/logo.svg" alt="logo" />
          </Spin>
        </div>
      }
    >
      <ErrorBoundary>
        <AuthProvider>
          <AntdConfigProvider>
            <QueryClientProvider client={queryClient}>
              <ModalProvider>
                <RouterProvider router={createBrowserRouter(router)} />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              </ModalProvider>
            </QueryClientProvider>
          </AntdConfigProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
