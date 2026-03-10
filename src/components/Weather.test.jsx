import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Weather from './Weather';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

// Mock Geolocation
const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementation((success) =>
        success({ coords: { latitude: 28.6, longitude: 77.2 } })
    ),
};
global.navigator.geolocation = mockGeolocation;

// Mock SpeechSynthesis
const mockSpeechSynthesis = {
    cancel: jest.fn(),
    speak: jest.fn(),
    getVoices: jest.fn().mockReturnValue([]),
    onvoiceschanged: null
};
window.speechSynthesis = mockSpeechSynthesis;
global.SpeechSynthesisUtterance = jest.fn();

// Mock Fetch
global.fetch = jest.fn();

const mockWeatherData = {
    success: true,
    data: {
        temp: 28,
        code: 0, // Sunny
        advisory: "Conditions are ideal for farming.",
        wind: 12,
        humidity: 45,
        rainProb: [10, 20, 0],
        forecast: [
            { date: "2023-10-27", max: 30, min: 20, code: 0 },
            { date: "2023-10-28", max: 29, min: 19, code: 1 },
            { date: "2023-10-29", max: 28, min: 18, code: 2 },
            { date: "2023-10-30", max: 27, min: 17, code: 3 },
            { date: "2023-10-31", max: 26, min: 16, code: 0 }
        ]
    }
};

describe('Weather Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch.mockResolvedValue({
            json: () => Promise.resolve(mockWeatherData)
        });
    });

    test('renders loading state initially', () => {
        render(
            <BrowserRouter>
                <Weather />
            </BrowserRouter>
        );
        expect(screen.getByText(/Syncing Satellite Intelligence/i)).toBeInTheDocument();
    });

    test('renders weather data after fetch', async () => {
        render(
            <BrowserRouter>
                <Weather />
            </BrowserRouter>
        );

        await waitFor(() => {
            const temps = screen.getAllByText(/28°/);
            expect(temps.length).toBeGreaterThan(0);
        });

        // Use getAllByText for "Clear Sky" as it appears in advisory and forecast labels
        const clearSkies = screen.getAllByText('Clear Sky');
        expect(clearSkies.length).toBeGreaterThan(0);

        expect(screen.getByText('Conditions are ideal for farming.')).toBeInTheDocument();
        expect(screen.getByText('12 km/h')).toBeInTheDocument();
    });

    test('navigates back on button click', async () => {
        render(
            <BrowserRouter>
                <Weather />
            </BrowserRouter>
        );

        await waitFor(() => {
            const temps = screen.getAllByText(/28°/);
            expect(temps.length).toBeGreaterThan(0);
        });

        const backBtn = screen.getByText(/Back to Dashboard/i);
        fireEvent.click(backBtn);
        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
});
