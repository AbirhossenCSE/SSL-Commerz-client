import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: 'https://ssl-commerz-server.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;