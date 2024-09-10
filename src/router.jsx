import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
