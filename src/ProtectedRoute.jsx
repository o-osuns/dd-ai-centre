import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // const user = localStorage.getItem('user');    
    
    // const isAuthenticated = (JSON.parse(user))?.token ?? false;
    // return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;