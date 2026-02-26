import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            
            {
                Component: Login,
                path: "/login"
            },
            {
                Component: Dashboard,
                path: "/dashboard"
            },
        ]
    }
]);

export default router;