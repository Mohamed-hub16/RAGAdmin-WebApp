import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRouteLogin: React.FC<PrivateRouteProps> = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user) {
        return <Navigate to="/RAGAdmin" replace />;
    }

    return children;
};

export default PrivateRouteLogin;
