import React from "react";
import AppLayout from "../layouts/app-layout/AppLayout";
import {
  employeeRoutes,
  employeeManagementRoutes,
  documentManagementRoutes,
  WithErrorBoundary,
} from "./routes";

const NotFoundPage = React.lazy(() => import("../pages/not-found/NotFoundPage"));

type Router = {
  path: string;
  name: string;
  element: JSX.Element;
  children?: Router[];
};

const routers: Router[] = [
  ...employeeRoutes,
  {
    path: "/",
    name: "",
    element: <AppLayout />,
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
      employeeManagementRoutes,
      documentManagementRoutes,
    ],
  },
];

export default routers as Router[];
