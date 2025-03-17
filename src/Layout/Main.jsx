import React from 'react';
import Navbar from '../Shared/Navbar';
import Product from '../components/Product';
import Home from '../components/Home/Home';
import Footer from '../Shared/Footer';


const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Product></Product>
            <Footer></Footer>
        </div>
    );
};

export default Main;