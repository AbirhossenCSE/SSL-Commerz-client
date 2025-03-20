import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import AddToCart from "../components/AddToCart";
import Checkout from "../components/Checkout";
import SignIn from "../SignIn/SignIn";
import Register from "../SignUp/Register";
import PrivateRoute from "./PrivateRoute";
import PaymentSuccess from "../components/PaymentSuccess/PaymentSuccess";
import PaymentFail from "../components/PaymentFail/PaymentFail";
import ContactUs from "../components/Contact/ContactUs";
import MyProfile from "../pages/MyProfile";
import MyOrder from "../pages/MyOrder";
import UpdateProfile from "../pages/UpdateProfile";


export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>
    },
    {
        path: '/add-to-cart',
        element: <PrivateRoute><AddToCart></AddToCart></PrivateRoute>
    },
    {
        path: '/checkout',
        element: <Checkout></Checkout>
    },
    {
        path: '/contactUs',
        element: <ContactUs></ContactUs>
    },
    {
        path: '/myProfile',
        element: <MyProfile></MyProfile>
    },
    {
        path: '/update-profile',
        element: <UpdateProfile></UpdateProfile>
    },
    {
        path: '/myOrder',
        element: <MyOrder></MyOrder>
    },
    {
        path: '/payment/success/:tranId',
        element: <PaymentSuccess></PaymentSuccess>
    },
    {
        path: '/payment/fail/:tranId',
        element: <PaymentFail></PaymentFail>
    },
    {
        path: '/register',
        element: <Register></Register>,
    },
    {
        path: '/signin',
        element: <SignIn></SignIn>,
    },

]);

