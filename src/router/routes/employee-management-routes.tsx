import React from "react";
import { WithErrorBoundary } from "../../components/error-boundary/ErrorBoundary";


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
    {
      path: "positions",
      name: "positions-list",
      element: (
        <WithErrorBoundary>
          <PositionsPage />
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
  ],
};