import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "../router/router.js";

function App() {

  return (
    <>
        <RouterProvider router={createBrowserRouter(router)} />
    </>
  )
}

export default App
