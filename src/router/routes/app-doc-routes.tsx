import React from "react";

import { WithErrorBoundary } from "../../components/error-boundary/ErrorBoundary";


const EmployeeCreatePage = React.lazy(() =>
  import("../../pages/employees").then((module) => ({
    default: module.EmployeeCreatePage,
  })),
);
const EmployeeDetailsPage = React.lazy(() =>
  import("../../pages/employees").then((module) => ({
    default: module.EmployeeDetailsPage,
  })),
);

const employeeRoutes = [
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

export const appDocRoutes = [
  ...employeeRoutes
]
