import { createBrowserRouter } from "react-router-dom";
import SharedLayout from "../pages/SharedLayout";
import Home from "../pages/Home";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Error from "../pages/Error";
import ProtectedRoute from "../pages/ProtectedRoute";
import UserPage from "../pages/UserPage";
import Profile from "../pages/Profile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: ":id", element: <UserPage /> },
          { path: "profile", element: <Profile /> },
        ]
      },
    ]
  },
  { path: "landing", element: <Landing /> },
  { path: "login", element: <Login /> },
  { path: "*", element: <Error /> }
])