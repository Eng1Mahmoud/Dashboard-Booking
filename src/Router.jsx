import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Admin} from "./pages/Admin";
import {Users} from  "./pages/Users"
import {Trips} from "./pages/Trips"
export const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        index: true,
        element:<Home/>,
      },
      {
        path:"/admins",
        element:<Admin/>
      },
      {
        path:"/users",
        element:<Users/>
      },
      {
        path:"/trips",
        element:<Trips/>
      },
     
    ],
  },
  {
    path: "/login",
    element:<Login/>
  }
  

]);
