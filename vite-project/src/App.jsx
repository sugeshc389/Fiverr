import "./app.scss";
import Navbar from './components/navbar/Navbar'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home } from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Gig from "./pages/gig/Gig";
import Gigs from "./pages/gigs/Gigs";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import MyGigs from "./pages/myGigs/MyGigs";
import Orders from "./pages/orders/Orders";
import Add from "./pages/add/Add";

function App() {

  const Layout = () => {

    return (

      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />

      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/gig/:id',
          element: <Gig />

        },
        {
          path: '/',
          element: <Home />

        },
        {
          path: '/gigs',
          element: <Gigs />

        },
        {
          path: '/message/:id',
          element: <Message />

        },
        {
          path: '/messages',
          element: <Messages />

        },
        {
          path: '/mygigs',
          element: <MyGigs />

        },
        {
          path: '/orders',
          element: <Orders />

        },
        {
          path: '/add',
          element: <Add />

        },


      ]
    }
  ])


  return (
    <>

      <RouterProvider router={router} />


    </>
  )
}

export default App
