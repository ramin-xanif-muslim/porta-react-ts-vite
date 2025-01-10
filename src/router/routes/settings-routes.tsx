import React from "react";
import { WithErrorBoundary } from "../../components/error-boundary/ErrorBoundary";
import NotFoundPage from "../../pages/not-found/NotFoundPage";

const UsersListPage = React.lazy(() =>
  import("../../pages/users").then((module) => ({
    default: module.UsersListPage,
  })),
);
const RolesListPage = React.lazy(() =>
  import("../../pages/roles").then((module) => ({
    default: module.RolesListPage,
  })),
);

export const settingsRoutes = {
  path: "settings",
  name: "settings",
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
      name: "settings-list",
      element: (
        <WithErrorBoundary>
          <UsersListPage />
        </WithErrorBoundary>
      ),
    },
    {
      path: "users",
      name: "users-list",
      element: (
          <WithErrorBoundary>
            <UsersListPage />
        </WithErrorBoundary>
      ),
    },
    {
      path: "roles",
      name: "roles-list",
      element: (
          <WithErrorBoundary>
            <RolesListPage />
        </WithErrorBoundary>
      ),
    },
  ],
};