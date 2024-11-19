import React, { Suspense } from "react";

const AppLayout = React.lazy(() => import("../layouts/app-layout/AppLayout"));
const FoldersLayout = React.lazy(
    () => import("../layouts/folders-layout/FoldersLayout")
);

const NotFount = React.lazy(() => import("../pages/not-found/NotFount"));

const FolderPage = React.lazy(() => import("../pages/folder/FolderPage"));
const Home = React.lazy(() => import("../pages/home/Home"));

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
                    <Suspense fallback={<div>Loading...</div>}>
                        <NotFount />
                    </Suspense>
                ),
            },
            {
                path: "/home",
                name: "home",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "/folders",
                name: "folders",
                element: <FoldersLayout />,
                children: [
                    {
                        path: ":id",
                        name: "folder",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
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
