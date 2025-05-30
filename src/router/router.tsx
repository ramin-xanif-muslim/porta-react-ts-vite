import React from "react";
import AppLayout from "../layouts/app-layout/AppLayout";
import { appDocRoutes, cms_routes, dms_routes, settingsRoutes } from "./routes";

import { WithErrorBoundary } from "../components/error-boundary/ErrorBoundary";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UserDetailsPage from "../pages/users/views/details/UserDetailsPage";
import { Navigate } from "react-router-dom";

const NotFoundPage = React.lazy(
  () => import("../pages/not-found/NotFoundPage"),
);

type Router = {
  path: string;
  name: string;
  element?: JSX.Element;
  children?: Router[];
};

const routers: Router[] = [
  ...appDocRoutes,
  {
    path: "/",
    name: "",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        name: "documents",
        element: <Navigate to="/documents/documents/folders" replace />
      },
      {
        path: "/dashboard",
        name: "dashboard",
        element: <DashboardPage />,
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
        path: "/users/:id",
        name: "user-details",
        element: <UserDetailsPage />,
      },
      cms_routes,
      dms_routes,
      settingsRoutes,
    ],
  },
];


export default routers as Router[];
