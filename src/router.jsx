import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import HomePage from "./pages/HomePage";
import ChatSidebar from "./components/ChatSidebar";
import backgroundVideo from "./assets/test.gif";
import logoHeader from "./assets/logo_test_with_clouds_1.gif";
import { UserProvider } from "./context/userContext";

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
      <UserProvider>
        <div className="relative flex justify-center items-start p-20 min-h-[calc(100vh-40px)]">
          {/* Background Video/Image */}
          <img
            src={backgroundVideo}
            className="absolute inset-0 w-screen h-screen object-cover z-0"
            alt=""
          />

          {/* Logo Header */}
          <div className="absolute top-0 left-0 z-20 p-4">
            <img src={logoHeader} alt="Logo" className="w-36 h-auto" />
          </div>

          {/* Foreground content */}
          <div className="relative z-10 flex w-[80%] max-w-5xl max-h-[80vh] bg-white bg-opacity-15 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 h-full overflow-hidden">
              <ChatSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-grow h-full overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
