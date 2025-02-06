import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Prompt } from '../prompt';
import '@testing-library/jest-dom';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Test utilities
const createMockResponse = (status: number, data: any) => ({
    status,
    json: () => Promise.resolve(data)
});

const createDelayedMockResponse = (status: number, data: any, delay: number) => ({
    status,
    json: () => new Promise(resolve => setTimeout(() => resolve(data), delay))
});

const sendMessage = (message: string) => {
    const input = screen.getByPlaceholderText(/votre message/i);
    const sendButton = screen.getByText(/envoyer/i);
    fireEvent.change(input, { target: { value: message } });
    fireEvent.click(sendButton);
};

describe('Prompt Component', () => {
    beforeEach(() => {
        mockFetch.mockClear();
        localStorage.setItem('userId', '123');
    });

    afterEach(() => {
        localStorage.clear();
    });

    const renderPrompt = () => {
        render(<Prompt />);
    };

    it('renders prompt component correctly', () => {
        renderPrompt();
        expect(screen.getByPlaceholderText(/votre message/i)).toBeInTheDocument();
        expect(screen.getByText(/envoyer/i)).toBeInTheDocument();
    });

    it('updates input value when typing', () => {
        renderPrompt();
        const input = screen.getByPlaceholderText(/votre message/i);
        fireEvent.change(input, { target: { value: 'Test message' } });
        expect(input).toHaveValue('Test message');
    });

    it('sends message successfully', async () => {
        const successResponse = createMockResponse(200, {
            message: 'Message envoyé avec succès',
            response: 'Réponse du système'
        });
        mockFetch.mockResolvedValueOnce(successResponse);

        renderPrompt();
        sendMessage('Test message');

        await waitFor(() => {
            const input = screen.getByPlaceholderText(/votre message/i);
            expect(input).toHaveValue('');
            expect(screen.getByText('Réponse du système')).toBeInTheDocument();
        });
    });

    it('handles empty message submission', () => {
        renderPrompt();
        const sendButton = screen.getByText(/envoyer/i);
        fireEvent.click(sendButton);
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it('handles message sending failure', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Failed to send message'));
        renderPrompt();
        sendMessage('Test message');

        await waitFor(() => {
            expect(screen.getByText(/erreur lors de l'envoi du message/i)).toBeInTheDocument();
        });
    });

    it('handles server error response', async () => {
        const errorResponse = createMockResponse(500, { message: 'Erreur serveur' });
        mockFetch.mockResolvedValueOnce(errorResponse);

        renderPrompt();
        sendMessage('Test message');

        await waitFor(() => {
            expect(screen.getByText(/erreur serveur/i)).toBeInTheDocument();
        });
    });

    it('clears error message when typing new message', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Failed to send message'));
        renderPrompt();

        // First, trigger an error
        sendMessage('Test message');
        await waitFor(() => {
            expect(screen.getByText(/erreur lors de l'envoi du message/i)).toBeInTheDocument();
        });

        // Then, type a new message
        const input = screen.getByPlaceholderText(/votre message/i);
        fireEvent.change(input, { target: { value: 'New message' } });

        // Error message should be cleared
        expect(screen.queryByText(/erreur lors de l'envoi du message/i)).not.toBeInTheDocument();
    });

    it('shows loading state while sending message', async () => {
        const delayedResponse = createDelayedMockResponse(200, {
            message: 'Message envoyé avec succès',
            response: 'Réponse du système'
        }, 100);
        mockFetch.mockResolvedValueOnce(delayedResponse);

        renderPrompt();
        sendMessage('Test message');

        // Check loading state
        expect(screen.getByText(/envoi en cours/i)).toBeInTheDocument();

        // Wait for response
        await waitFor(() => {
            expect(screen.queryByText(/envoi en cours/i)).not.toBeInTheDocument();
            expect(screen.getByText('Réponse du système')).toBeInTheDocument();
        });
    });
});
