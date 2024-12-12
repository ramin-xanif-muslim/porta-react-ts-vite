import React, { Suspense } from "react";
import { Skeleton } from "antd";
import SuspenseFallback from "../components/suspense-fallback";
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import ErrorFallback from '../components/error-boundary/ErrorFallback';

// LAYOUTS
const AppLayout = React.lazy(() => import("../layouts/app-layout/AppLayout"));
const DocumentLayout = React.lazy(() => import("../layouts/document-layout/DocumentLayout"));
const DocumentManagementLayout = React.lazy(
    () => import("../layouts/document-layout/DocumentManagementLayout")
);

const NotFount = React.lazy(() => import("../pages/not-found/NotFount"));

// PAGES
const SettingPage = React.lazy(() => import("../pages/setting/SettingPage"));
const DocumentPage = React.lazy(() => import("../pages/document/DocumentPage"));

type Router = {
    path: string;
    name: string;
    element: JSX.Element;
    children?: Router[];
};

const routers: Router[] = [
    {
        path: "/",
        name: "",
        element: <AppLayout />,
        children: [
            {
                path: "*",
                name: "not-found",
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <NotFount />
                    </Suspense>
                ),
            },

            // -----------------------------------
            // DOCUMENT MANAGEMENT
            // -----------------------------------
            {
                path: "document-management",
                name: "document-management",
                element: (
                    <Suspense
                        fallback={
                            <div className="p-4 w-full">
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
                            <Suspense fallback={<SuspenseFallback />}>
                                <NotFount />
                            </Suspense>
                        ),
                    },
                    {
                        path: "folders",
                        name: "documents",
                        element: (
                            <ErrorBoundary
                                fallback={<ErrorFallback error={new Error('Failed to load document page')} />}
                            >
                                <Suspense fallback={<SuspenseFallback />}>
                                    <DocumentLayout />
                                </Suspense>
                            </ErrorBoundary>
                        ),
                        children: [
                            {
                                path: "folders/:id",
                                name: "document",
                                element: (
                                    <ErrorBoundary
                                        fallback={<ErrorFallback error={new Error('Failed to load document page')} />}
                                    >
                                        <Suspense fallback={<SuspenseFallback />}>
                                            <DocumentPage />
                                        </Suspense>
                                    </ErrorBoundary>
                                ),
                            },
                        ]
                    },
                    {
                        path: "setting",
                        name: "setting",
                        element: (
                            <Suspense fallback={<SuspenseFallback />}>
                                <SettingPage />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

export default routers as Router[];
