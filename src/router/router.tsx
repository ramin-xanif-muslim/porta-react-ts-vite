import React, { Suspense } from "react";
import { Skeleton } from "antd";
import SuspenseFallback from "../components/suspense-fallback";

const AppLayout = React.lazy(() => import("../layouts/app-layout/AppLayout"));
const FoldersLayout = React.lazy(
    () => import("../layouts/folders-layout/FoldersLayout")
);

const NotFount = React.lazy(() => import("../pages/not-found/NotFount"));

const FolderPage = React.lazy(() => import("../pages/folder/FolderPage"));

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
                        <FoldersLayout />
                    </Suspense>
                ),
                children: [
                    {
                        path: ":id",
                        name: "folder",
                        element: (
                            <Suspense fallback={<SuspenseFallback />}>
                                <FolderPage />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

export default routers as Router[];
