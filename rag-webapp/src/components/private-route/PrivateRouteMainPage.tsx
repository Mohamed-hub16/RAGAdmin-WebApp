import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRouteMainPage: React.FC<PrivateRouteProps> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('userId') || 'null');

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRouteMainPage;
