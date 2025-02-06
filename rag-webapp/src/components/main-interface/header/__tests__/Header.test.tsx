import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
    it('renders header correctly', () => {
        render(<Header />);
        expect(screen.getByText(/RAGAdmin/i)).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('has correct image attributes', () => {
        render(<Header />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('alt', 'logo');
        expect(image).toHaveAttribute('src', expect.stringContaining('logo.png'));
    });
});
