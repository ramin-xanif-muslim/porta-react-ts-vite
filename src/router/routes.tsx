import React, { Suspense } from "react";
import { Skeleton } from "antd";
import SuspenseFallback from "../components/suspense-fallback";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import ErrorFallback from "../components/error-boundary/ErrorFallback";

// Lazy loaded components
const DocumentLayout = React.lazy(
  () => import("../layouts/document-layout/DocumentLayout"),
);
const DocumentManagementLayout = React.lazy(
  () => import("../layouts/document-layout/DocumentManagementLayout"),
);
const EmployeeManagementLayout = React.lazy(
  () => import("../layouts/employee-layout/EmployeeManagementLayout"),
);
const NotFoundPage = React.lazy(() => import("../pages/not-found/NotFoundPage"));

const SettingPage = React.lazy(() => import("../pages/setting/SettingPage"));
const DocumentPage = React.lazy(() => import("../pages/document/DocumentPage"));

const EmployeeCreatePage = React.lazy(() =>
  import("../pages/employees").then((module) => ({
    default: module.EmployeeCreatePage,
  })),
);
const EmployeeDetailsPage = React.lazy(() =>
  import("../pages/employees").then((module) => ({
    default: module.EmployeeDetailsPage,
  })),
);
const EmployeesPage = React.lazy(() =>
  import("../pages/employees").then((module) => ({
    default: module.EmployeesPage,
  })),
);

// Helper components for common patterns

export const WithErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ErrorBoundary
    fallback={
      <ErrorFallback
        error={new Error("Something went wrong. Please try again later.")}
      />
    }
  >
    <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
  </ErrorBoundary>
);

export const employeeRoutes = [
  {
    path: "/employees/create",
    name: "employee-create",
    element: (
      <WithErrorBoundary>
        <EmployeeCreatePage />
      </WithErrorBoundary>
    ),
  },
  {
    path: "/employees/edit/:id",
    name: "employee-edit",
    element: (
      <WithErrorBoundary>
        <EmployeeDetailsPage />
      </WithErrorBoundary>
    ),
  },
];

export const employeeManagementRoutes = {
  path: "employee-management",
  name: "employee-management",
  element: (
    <WithErrorBoundary>
      <EmployeeManagementLayout />
    </WithErrorBoundary>
  ),
  children: [
    {
      path: "",
      name: "employee-list",
      element: (
        <WithErrorBoundary>
          <EmployeesPage />
        </WithErrorBoundary>
      ),
    },
    {
      path: "employees",
      name: "employee-list",
      element: (
        <WithErrorBoundary>
          <EmployeesPage />
        </WithErrorBoundary>
      ),
    },
  ],
};

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
