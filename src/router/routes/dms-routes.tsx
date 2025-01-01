import React, { Suspense } from "react";
import { Skeleton } from "antd";
import { Navigate } from "react-router-dom";

import { WithErrorBoundary } from "../../components/error-boundary/ErrorBoundary";

// Lazy loaded components
const DocumentLayout = React.lazy(
  () => import("../../layouts/document-layout/DocumentLayout"),
);
const DocumentManagementLayout = React.lazy(
  () => import("../../layouts/document-layout/DocumentManagementLayout"),
);
const NotFoundPage = React.lazy(
  () => import("../../pages/not-found/NotFoundPage"),
);
const SettingPage = React.lazy(() => import("../../pages/setting/SettingPage"));
const DocumentPage = React.lazy(
  () => import("../../pages/document/DocumentPage"),
);

export const dms_routes = {
  path: "documents",
  name: "documents",
  children: [
    {
      path: "",
      name: "dashboard",
      element: <Navigate to="documents" replace />,
    },
    {
      path: "*",
      name: "not-found",
      element: (
        <WithErrorBoundary>
          <NotFoundPage />
        </WithErrorBoundary>
      ),
    },
    {
      path: "documents",
      name: "documents",
      element: (
        <Suspense
          fallback={
            <div className="w-full p-4">
              <Skeleton.Input block size="large" active />
            </div>
          }
        >
          <DocumentManagementLayout />
        </Suspense>
      ),
      children: [
        {
          path: "*",
          name: "not-found",
          element: (
            <WithErrorBoundary>
              <NotFoundPage />
            </WithErrorBoundary>
          ),
        },
        {
          path: "folders",
          name: "folders",
          element: (
            <WithErrorBoundary>
              <DocumentLayout />
            </WithErrorBoundary>
          ),
          children: [
            {
              path: ":id",
              name: "folder",
              element: (
                <WithErrorBoundary>
                  <DocumentPage />
                </WithErrorBoundary>
              ),
            },
          ],
        },
        {
          path: "setting",
          name: "setting",
          element: (
            <WithErrorBoundary>
              <SettingPage />
            </WithErrorBoundary>
          ),
        },
      ],
    },
  ],
};
