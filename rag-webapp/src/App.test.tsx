import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

describe('App Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const renderApp = () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    };

    it('renders login page by default', () => {
        renderApp();
        expect(screen.getByText(/RAGAdmin/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
    });

    it('shows login form when not authenticated', () => {
        renderApp();
        expect(screen.getByPlaceholderText(/identifiant/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument();
    });

    it('contains navigation routes', () => {
        renderApp();
        const app = screen.getByTestId('app');
        expect(app).toBeInTheDocument();
    });
});
