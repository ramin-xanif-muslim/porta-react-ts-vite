import React from "react";
import AppLayout from "../layouts/app-layout/AppLayout";
import {
  appDocRoutes,
  cms_routes,
  dms_routes,
  settingsRoutes
} from "./routes";

import { WithErrorBoundary } from "../components/error-boundary/ErrorBoundary";
import DashboardPage from "../pages/dashboard/DashboardPage";

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
        name: "dashboard",
        element: <DashboardPage />,
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
      cms_routes,
      dms_routes,
      settingsRoutes,
    ],
  },
];

export default routers as Router[];
