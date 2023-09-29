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
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Whishlist from "./pages/whishlist/Whishlist";
import Profile from "./pages/profile/Profile";
import OrderPopup from "./pages/orderPopup/OrderPopup";
import Checkout from "./pages/checkOut/CheckOut";


function App() {
  const queryClient = new QueryClient();

  const Layout = () => {

    return (

      <div className="app">
        <QueryClientProvider client={queryClient}>

          <Navbar />
          <Outlet />
          <Footer />

        </QueryClientProvider>
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
        {
          path: '/login',
          element: <Login />

        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/whishlist',
          element: <Whishlist />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/popup/:id',
          element: <OrderPopup />
        },
        {
          path: '/checkout',
          element: <Checkout />
        }


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
