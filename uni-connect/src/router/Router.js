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
import Resource from "../page/resources/Resource";
import Event from "../page/event/Event";
import EventDetail from "../page/event/EventDetail";
import Resources from "../page/resources/Resources";
import ResourceDetail from "../page/resources/ResourceDetail";
import Surveys from "../page/survey/Surveys";
import SurveyQuestions from "../page/survey/SurveyQuestions";


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
        path: "/users/:userId/profile",
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
        element: <ProtectedRoute element={<Surveys />} />,
      },
      {
        path: "/survey/:id/questions",
        element: <ProtectedRoute element={<SurveyQuestions />} />,

        path: "/users/:userId/resources/:id",
        element: <ProtectedRoute element={<ResourceDetail />} />,

      },
      {
        path:"/events",
        element: <ProtectedRoute element={<Event />} />,
      },
      {
        path:"/events/:id/details",
        element: <ProtectedRoute element={<EventDetail />} />,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace />,
      },
    ]);
  
    return <RouterProvider router={routes} />;
  };
  
  export default Router;