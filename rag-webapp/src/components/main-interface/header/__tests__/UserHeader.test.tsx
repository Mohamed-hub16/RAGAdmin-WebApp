import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserHeader } from '../UserHeader';
import '@testing-library/jest-dom';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('UserHeader Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        localStorage.setItem('userId', '123');
    });

    afterEach(() => {
        localStorage.clear();
    });

    const renderUserHeader = () => {
        render(
            <BrowserRouter>
                <UserHeader />
            </BrowserRouter>
        );
    };

    it('renders user header correctly', () => {
        renderUserHeader();
        expect(screen.getByText(/déconnexion/i)).toBeInTheDocument();
    });

    it('handles logout correctly', () => {
        renderUserHeader();
        const logoutButton = screen.getByText(/déconnexion/i);
        
        fireEvent.click(logoutButton);
        
        expect(localStorage.getItem('userId')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('displays user icon', () => {
        renderUserHeader();
        const userIcon = screen.getByAltText(/user/i);
        expect(userIcon).toBeInTheDocument();
        expect(userIcon).toHaveAttribute('alt', 'user');
    });
});
