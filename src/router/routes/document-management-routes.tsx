import React, { Suspense } from "react";
import { Skeleton } from "antd";

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

export const documentManagementRoutes = {
  path: "document-management",
  name: "document-management",
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
      path: "documents",
      name: "documents",
      element: (<></>),
    },
    {
      path: "documents/folders",
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
      path: "documents/setting",
      name: "setting",
      element: (
        <WithErrorBoundary>
          <SettingPage />
        </WithErrorBoundary>
      ),
    },
  ],
};
