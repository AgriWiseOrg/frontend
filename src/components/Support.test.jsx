import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Support from './Support';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

// Mock Language Context
jest.mock('./LanguageContext', () => ({
    useLanguage: () => ({
        language: 'en',
        setLanguage: jest.fn()
    })
}));

// Mock Fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ success: true, data: [] }),
    })
);

describe('Support Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Support component correctly', () => {
        render(
            <BrowserRouter>
                <Support user={{ email: 'test@example.com' }} />
            </BrowserRouter>
        );
        // Use regex to match text with emoji
        expect(screen.getByRole('heading', { name: /Decision Support & Assistance/i })).toBeInTheDocument();
        expect(screen.getByText(/Knowledge is power/i)).toBeInTheDocument();
    });

    test('renders key sections', () => {
        render(
            <BrowserRouter>
                <Support user={{ email: 'test@example.com' }} />
            </BrowserRouter>
        );
        expect(screen.getByText(/Crop Health Diagnostic/i)).toBeInTheDocument();
        expect(screen.getByText(/Premium Scheme Portal/i)).toBeInTheDocument();
        expect(screen.getByText(/Market & Pricing Insights/i)).toBeInTheDocument();
    });

    test('opens Dispute form when "Report Issue" is clicked', async () => {
        render(
            <BrowserRouter>
                <Support user={{ email: 'test@example.com' }} />
            </BrowserRouter>
        );

        // Use getByRole to be specific to the button
        const reportBtn = screen.getByRole('button', { name: /Report Issue/i });
        fireEvent.click(reportBtn);

        // Wait for modal to appear -> Check for "Issue Category" label which exists in the form
        await waitFor(() => {
            expect(screen.getByText(/Issue Category/i)).toBeInTheDocument();
        });
    });
});
