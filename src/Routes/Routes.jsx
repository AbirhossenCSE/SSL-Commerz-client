import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import AddToCart from "../components/AddToCart";


export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>
    },
    {
        path: '/add-to-cart',
        element: <AddToCart></AddToCart>
    },

]);

