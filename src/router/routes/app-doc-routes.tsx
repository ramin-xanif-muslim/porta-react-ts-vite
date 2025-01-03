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

const UserCreatePage = React.lazy(() =>
  import("../../pages/users").then((module) => ({
    default: module.UserCreatePage,
  })),
);
const UserDetailsPage = React.lazy(() =>
  import("../../pages/users").then((module) => ({
    default: module.UserDetailsPage,
  })),
);

const userRoutes = [
  {
    path: "/users/create",
    name: "user-create",
    element: (
      <WithErrorBoundary>
        <UserCreatePage />
      </WithErrorBoundary>
    ),
  },
  {
    path: "/users/edit/:id",
    name: "user-edit",
    element: (
      <WithErrorBoundary>
        <UserDetailsPage />
      </WithErrorBoundary>
    ),
  },
];

export const appDocRoutes = [
  ...employeeRoutes,
  ...userRoutes,
];
