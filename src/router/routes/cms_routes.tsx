import React from "react";
import { WithErrorBoundary } from "../../components/error-boundary/ErrorBoundary";
import NotFoundPage from "../../pages/not-found/NotFoundPage";


const EmployeeManagementLayout = React.lazy(
  () => import("../../layouts/employee-layout/EmployeeManagementLayout"),
);
const EmployeesPage = React.lazy(() =>
  import("../../pages/employees").then((module) => ({
    default: module.EmployeesPage,
  })),
);
const PositionsPage = React.lazy(() =>
  import("../../pages/positions").then((module) => ({
    default: module.PositionsPage,
  })),
);
const DepartmentsPage = React.lazy(() =>
  import("../../pages/departments").then((module) => ({
    default: module.DepartmentsPage,
  })),
);

export const cms_routes = {
  path: "crew",
  name: "crew",
  element: (
    <WithErrorBoundary>
      <EmployeeManagementLayout />
    </WithErrorBoundary>
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
      name: "employees",
      element: (
        <WithErrorBoundary>
          <EmployeesPage />
        </WithErrorBoundary>
      ),
    },
    {
      path: "departments",
      name: "departments-list",
      element: (
        <WithErrorBoundary>
          <DepartmentsPage />
        </WithErrorBoundary>
      ),
    },
    {
      path: "positions",
      name: "positions-list",
      element: (
        <WithErrorBoundary>
          <PositionsPage />
        </WithErrorBoundary>
      ),
    },
  ],
};