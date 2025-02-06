import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
};
