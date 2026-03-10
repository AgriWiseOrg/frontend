import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Weather from './Weather';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';

// Mock translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: vi.fn().mockImplementation((success) => 
    Promise.resolve(success({ coords: { latitude: 28.6139, longitude: 77.2090 } }))
  )
};
global.navigator.geolocation = mockGeolocation;

const renderWeather = () => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <Weather />
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('Weather Component Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially, then displays weather data on successful API call', async () => {
    // 1. Mock the API to return success after a short delay
    global.fetch = vi.fn(() =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            json: () => Promise.resolve({
              success: true,
              data: {
                temp: 30,
                humidity: 50,
                wind: 10,
                advisory: "Integration Test Advisory",
                code: 0,
                icon: "☀️",
                rainProb: [0,0,0,0,0],
                forecast: [
                  { date: '2025-05-15', min: 20, max: 35, code: 0 }
                ]
              }
            })
          });
        }, 100);
      })
    );

    // 2. Render Component
    renderWeather();

    // 3. Verify Loading State
    expect(screen.getByText(/Syncing Satellite Intelligence/i)).toBeInTheDocument();

    // 4. Verify Data renders after API completes
    await waitFor(() => {
      expect(screen.getByText('30°')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Integration Test Advisory')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    // Ensure the API call included correct lat/long from mocked geolocation
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('lat=28.6139&lon=77.209'));
  });

  it('handles API failure gracefully by displaying error UI', async () => {
    // 1. Mock fetch to reject (simulate network error)
    global.fetch = vi.fn(() => Promise.reject(new Error("Network Error")));

    renderWeather();

    // 2. Wait for error boundary / failure UI
    await waitFor(() => {
      expect(screen.getByText(/Connection Failed/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/We couldn't reach the weather satellites/i)).toBeInTheDocument();
  });
});
