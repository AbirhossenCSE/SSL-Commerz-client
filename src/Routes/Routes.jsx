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

