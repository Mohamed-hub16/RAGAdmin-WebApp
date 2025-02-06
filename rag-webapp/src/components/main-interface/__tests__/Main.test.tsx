import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Main from '../Main';
import '@testing-library/jest-dom';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Main Component', () => {
    beforeEach(() => {
        mockFetch.mockClear();
        mockNavigate.mockClear();
        localStorage.setItem('userId', '123');
    });

    afterEach(() => {
        localStorage.clear();
    });

    const renderMain = () => {
        render(
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        );
    };

    it('renders main interface correctly', () => {
        renderMain();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
    });

    it('handles sending a message', async () => {
        const mockResponse = {
            status: 200,
            json: () => Promise.resolve({ message: 'Message envoyé avec succès' })
        };
        mockFetch.mockResolvedValueOnce(mockResponse);

        renderMain();
        
        const messageInput = screen.getByRole('textbox');
        const sendButton = screen.getByRole('button', { name: /envoyer/i });

        fireEvent.change(messageInput, { target: { value: 'Test message' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalled();
            expect(messageInput).toHaveValue('');
        });
    });

    it('handles message sending failure', async () => {
        const mockResponse = {
            status: 500,
            json: () => Promise.resolve({ message: 'Erreur lors de l\'envoi du message' })
        };
        mockFetch.mockResolvedValueOnce(mockResponse);

        renderMain();
        
        const messageInput = screen.getByRole('textbox');
        const sendButton = screen.getByRole('button', { name: /envoyer/i });

        fireEvent.change(messageInput, { target: { value: 'Test message' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText(/erreur lors de l'envoi du message/i)).toBeInTheDocument();
        });
    });

    it('handles network error', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        renderMain();
        
        const messageInput = screen.getByRole('textbox');
        const sendButton = screen.getByRole('button', { name: /envoyer/i });

        fireEvent.change(messageInput, { target: { value: 'Test message' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument();
        });
    });

    it('redirects to login when userId is not present', () => {
        localStorage.clear();
        renderMain();
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('loads chat history on mount', async () => {
        const mockHistoryResponse = {
            status: 200,
            json: () => Promise.resolve([
                { id: 1, content: 'Message 1' },
                { id: 2, content: 'Message 2' }
            ])
        };
        mockFetch.mockResolvedValueOnce(mockHistoryResponse);

        renderMain();

        await waitFor(() => {
            expect(screen.getByText('Message 1')).toBeInTheDocument();
            expect(screen.getByText('Message 2')).toBeInTheDocument();
        });
    });

    it('handles empty message submission', async () => {
        renderMain();
        
        const sendButton = screen.getByRole('button', { name: /envoyer/i });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(mockFetch).not.toHaveBeenCalled();
        });
    });
});
