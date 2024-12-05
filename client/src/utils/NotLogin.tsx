import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function NotLogin() {

    const token = localStorage.getItem("token");

    return token ? <Navigate to="/" /> : <Outlet />;
}

export default NotLogin