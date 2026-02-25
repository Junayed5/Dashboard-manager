import { createBrowserRouter } from "react-router";
import App from "../App";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";

const router = createBrowserRouter([
    {
        Component: App,
        path:"/",
        children:[
            {
                Component:Dashboard,
                path:"/dashboard"
            },
            {
                Component:Login,
                path:"/login"
            },
        ]
    }
]);

export default router;