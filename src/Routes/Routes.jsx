import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import AddToCart from "../components/AddToCart";
import Checkout from "../components/Checkout";


export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>
    },
    {
        path: '/add-to-cart',
        element: <AddToCart></AddToCart>
    },
    {
        path: '/checkout',
        element: <Checkout></Checkout>
    },

]);

