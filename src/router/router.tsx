import React, { Suspense } from "react";
import { Skeleton } from "antd";
import SuspenseFallback from "../components/suspense-fallback";
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import ErrorFallback from '../components/error-boundary/ErrorFallback';

const AppLayout = React.lazy(() => import("../layouts/app-layout/AppLayout"));
const DocumentLayout = React.lazy(
    () => import("../layouts/document-layout/DocumentLayout")
);

const NotFount = React.lazy(() => import("../pages/not-found/NotFount"));

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
            {
                path: "setting",
                name: "setting",
                element: (
                    <Suspense fallback={<SuspenseFallback />}>
                        <SettingPage />
                    </Suspense>
                ),
            },
            {
                path: "/folders",
                name: "folders",
                element: (
                    <Suspense
                        fallback={
                            <div className="p-4 w-full">
                                <Skeleton.Input block size="large" active />
                            </div>
                        }
                    >
                        <DocumentLayout />
                    </Suspense>
                ),
                children: [
                    {
                        path: ":id",
                        name: "folder",
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
                ],
            },
        ],
    },
];

export default routers as Router[];
