import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "../router/router.js";
import { Suspense } from "react";

function App() {

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
        <RouterProvider router={createBrowserRouter(router)} />
    </Suspense>
  )
}

export default App
