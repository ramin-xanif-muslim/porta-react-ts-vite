import React from "react";
import AppLayout from "../layouts/app-layout/AppLayout";
const Home = React.lazy(() => import("../pages/home/Home"));

type Router = {
    path: string;
    name: string;
    element: JSX.Element;
    layout?: string;
};

const routers: Router[] = [
    {
        path: "/",
        name: "home",
        element: (
            <React.Suspense fallback={<div>Loading...</div>}>
                <Home />
            </React.Suspense>
        ),
        layout: "app",
    },
    {
        path: "*",
        name: "not-found",
        element: (
            <React.Suspense fallback={<div>Loading...</div>}>
                <Home />
            </React.Suspense>
        ),
        layout: "app",
    },
];



const routerMap = (routers: Router[]) => routers.map(router => {
    if (router.layout) {
        if (router.layout === 'app') {
            router.element = <AppLayout>{router.element}</AppLayout>
        }
    }
    return router;
})

export default routerMap(routers) as Router[]

