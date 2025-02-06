import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRouteLogin } from '../PrivateRouteLogin';
import '@testing-library/jest-dom';

// Mock Navigate component
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: jest.fn()
}));

describe('PrivateRouteLogin Component', () => {
    beforeEach(() => {
        (Navigate as jest.Mock).mockClear();
    });

    it('redirects to /main when user is logged in', () => {
        localStorage.setItem('userId', '123');

        render(
            <BrowserRouter>
                <PrivateRouteLogin />
            </BrowserRouter>
        );

        expect(Navigate).toHaveBeenCalledWith({ to: '/main' }, {});

        localStorage.clear();
    });

    it('renders children when user is not logged in', () => {
        localStorage.clear();

        const { container } = render(
            <BrowserRouter>
                <PrivateRouteLogin>
                    <div data-testid="test-child">Test Content</div>
                </PrivateRouteLogin>
            </BrowserRouter>
        );

        expect(Navigate).not.toHaveBeenCalled();
        expect(container).toBeInTheDocument();
    });
});
