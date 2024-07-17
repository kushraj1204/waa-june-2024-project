import {
    createBrowserRouter,
    Navigate,
    RouterProvider,

} from "react-router-dom";
import SignUp from "../page/auth/Signup";
import Login from "../page/auth/Login";
import Home from "../page/home";
import Profile from "../page/profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import AnonymousRoute from "./AnonymousRoute";
import Resources from "../page/resources/Resources";
import ResourceDetail from "../page/resources/ResourceDetail";
import SurveyList from "../page/survey/SurveyList";



const Router = () => {
  
    const routes = createBrowserRouter([
    
      {
        path: "/sign-up",
        element: <AnonymousRoute element={<SignUp />} />,
      },
      {
        path: "/login",
        element: <AnonymousRoute element={<Login />} />,
      },

      {
        path: "/home",
        element: <ProtectedRoute element={<Home />} />,
      },
      {
        path: "/users/:id/profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "/resources",
        element: <ProtectedRoute element={<Resources />} />,
      },
      {
        path: "/resources/:id",
        element: <ProtectedRoute element={<ResourceDetail />} />,
      },
      {
        path: "/surveys",
        element: <ProtectedRoute element={<SurveyList />} />,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ]);
  
    return <RouterProvider router={routes} />;
  };
  
  export default Router;