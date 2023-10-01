
import AdminHome from '../pages/ AdminHome';
import Users from '../pages/users/Users';
import GetGigs from '../pages/gigs/GetGigs';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminHome />
    },
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "getgigs",
      element: <GetGigs />,
    }
  ]);

  return (
    <RouterProvider router={router} />

  )
}

export default App
