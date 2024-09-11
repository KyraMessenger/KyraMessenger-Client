import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
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
        loader: () => {
          if (localStorage.getItem("token")) {
            return redirect("/");
          }
          return null;
        },
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <h1>Homeee</h1>,
            <button
              className="text-red-600"
              onClick={() => {
                localStorage.removeItem("token");
                return redirect("/login");
              }}
            >
              Log out
            </button>
          </>
        ),
      },
    ],
  },
]);

export default router;
