import React from "react";
import AppLayout from "../layouts/app-layout/AppLayout";
import FoldersLayout from "../layouts/folders-layout/FoldersLayout";
import FolderPage from "../pages/folder/FolderPage";
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
                element: <h1>Not Found</h1>,
            },
            {
                path: "/home",
                name: "home",
                element: <Home />,
            },
            {
                path: "/folders",
                name: "folders",
                element: <FoldersLayout />,
                children: [
                    {
                        path: ":id",
                        name: "folder",
                        element: <FolderPage />,
                    },
                ],
            },
        ],
    },
];

export default routers as Router[]

