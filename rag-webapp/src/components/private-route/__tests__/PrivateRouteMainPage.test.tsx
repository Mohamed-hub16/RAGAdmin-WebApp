import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRouteMainPage } from '../PrivateRouteMainPage';
import '@testing-library/jest-dom';

// Mock Navigate component
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: jest.fn()
}));

describe('PrivateRouteMainPage Component', () => {
    beforeEach(() => {
        (Navigate as jest.Mock).mockClear();
    });

    it('redirects to / when user is not logged in', () => {
        localStorage.clear();

        render(
            <BrowserRouter>
                <PrivateRouteMainPage />
            </BrowserRouter>
        );

        expect(Navigate).toHaveBeenCalledWith({ to: '/' }, {});
    });

    it('renders children when user is logged in', () => {
        localStorage.setItem('userId', '123');

        const { container } = render(
            <BrowserRouter>
                <PrivateRouteMainPage>
                    <div data-testid="test-child">Test Content</div>
                </PrivateRouteMainPage>
            </BrowserRouter>
        );

        expect(Navigate).not.toHaveBeenCalled();
        expect(container).toBeInTheDocument();

        localStorage.clear();
    });
});
