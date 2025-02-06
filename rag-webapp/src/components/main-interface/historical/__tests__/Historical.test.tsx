import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Historical } from '../Historical';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Historical Component', () => {
    const mockUserId = 1;
    const mockOnChatSelected = jest.fn();

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should render loading state initially', () => {
        render(<Historical userId={mockUserId} onChatSelected={mockOnChatSelected} />);
        expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();
    });

    it('should render chats when data is fetched successfully', async () => {
        const mockChats = [
            { id: 1, created_at: '2024-02-06T12:00:00Z' },
            { id: 2, created_at: '2024-02-06T13:00:00Z' }
        ];

        fetchMock.mockResponseOnce(JSON.stringify(mockChats));

        render(<Historical userId={mockUserId} onChatSelected={mockOnChatSelected} />);

        await waitFor(() => {
            expect(screen.getByText(/New chat - Créé le/)).toBeInTheDocument();
        });
    });

    it('should handle empty chats response', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Aucun historique trouvé.' }));

        render(<Historical userId={mockUserId} onChatSelected={mockOnChatSelected} />);

        await waitFor(() => {
            expect(screen.getByText(/Aucun historique trouvé./)).toBeInTheDocument();
        });
    });

    it('should handle error response', async () => {
        fetchMock.mockRejectOnce(new Error('Erreur de réseau'));

        render(<Historical userId={mockUserId} onChatSelected={mockOnChatSelected} />);

        await waitFor(() => {
            expect(screen.getByText(/Erreur de réseau/)).toBeInTheDocument();
        });
    });

    it('should handle chat selection', async () => {
        const mockChats = [
            { id: 1, created_at: '2024-02-06T12:00:00Z' }
        ];

        const mockMessages = [
            { sender: 'user', text: 'Hello' },
            { sender: 'bot', text: 'Hi there!' }
        ];

        fetchMock
            .mockResponseOnce(JSON.stringify(mockChats))
            .mockResponseOnce(JSON.stringify(mockMessages));

        render(<Historical userId={mockUserId} onChatSelected={mockOnChatSelected} />);

        await waitFor(() => {
            const chatElement = screen.getByText(/New chat - Créé le/);
            fireEvent.click(chatElement);
        });

        await waitFor(() => {
            expect(mockOnChatSelected).toHaveBeenCalledWith(1, mockMessages);
        });
    });
});
