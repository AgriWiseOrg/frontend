import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Marketplace from './MarketPlace';
import { CartProvider } from './CartContext'; 
import '@testing-library/jest-dom';

// 1. GLOBAL MOCKS
global.fetch = jest.fn();
global.alert = jest.fn();

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, layout, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// 2. TEST DATA
const mockProducts = [
  { _id: '1', name: 'Basmati Rice', farmerName: 'Ramesh', price: 2500, quantity: 50, location: 'Kerala', rating: 4.8 },
  { _id: '2', name: 'Organic Wheat', farmerName: 'Suresh', price: 1800, quantity: 30, location: 'Punjab', rating: 4.2 },
  { _id: '3', name: 'Fresh Tomato', farmerName: 'Anil', price: 1200, quantity: 100, location: 'Tamil Nadu', rating: 3.5 }
];

describe('Marketplace Unit & Integration Suite', () => {
  beforeEach(() => {
    fetch.mockClear();
    global.alert.mockClear();
    jest.clearAllMocks();
  });

  const setup = async () => {
    fetch.mockResolvedValueOnce({ json: async () => mockProducts });
    await act(async () => {
      render(
        <BrowserRouter>
          <CartProvider>
            <Marketplace />
          </CartProvider>
        </BrowserRouter>
      );
    });
    await waitFor(() => screen.getByText('Basmati Rice'));
  };

  // --- UNIT TEST: FETCH & INITIAL RENDER ---
  test('Function: useEffect (Initial Fetch) - renders products correctly', async () => {
    await setup();
    expect(screen.getByText('Basmati Rice')).toBeInTheDocument();
    expect(screen.getByText('Organic Wheat')).toBeInTheDocument();
    expect(screen.getByText('Fresh Tomato')).toBeInTheDocument();
  });

  // --- UNIT TEST: SEARCH FILTER FUNCTION ---
  test('Function: Filter Logic (Search) - matches name, farmer, and crop', async () => {
    await setup();
    const searchInput = screen.getByPlaceholderText(/Search premium crops/i);
    
    // Search by Name
    fireEvent.change(searchInput, { target: { value: 'Rice' } });
    expect(screen.getByText('Basmati Rice')).toBeInTheDocument();
    expect(screen.queryByText('Organic Wheat')).not.toBeInTheDocument();
    
    // Search by Farmer Name
    fireEvent.change(searchInput, { target: { value: 'Anil' } });
    expect(screen.getByText('Fresh Tomato')).toBeInTheDocument();
  });

  // --- UNIT TEST: LOCATION FILTER FUNCTION ---
  test('Function: Filter Logic (Location) - filters by region string', async () => {
    await setup();
    const locationInput = screen.getByPlaceholderText(/e.g. Kerala/i);
    
    fireEvent.change(locationInput, { target: { value: 'Punjab' } });
    expect(screen.getByText('Organic Wheat')).toBeInTheDocument();
    expect(screen.queryByText('Basmati Rice')).not.toBeInTheDocument();
  });

  // --- UNIT TEST: MAX PRICE FILTER FUNCTION ---
  test('Function: Filter Logic (Max Budget) - excludes items above price', async () => {
    await setup();
    const budgetInput = screen.getByPlaceholderText(/Enter amount/i);
    
    // Set budget to 1500 (Only Tomato should show)
    fireEvent.change(budgetInput, { target: { value: '1500' } });
    expect(screen.getByText('Fresh Tomato')).toBeInTheDocument();
    expect(screen.queryByText('Basmati Rice')).not.toBeInTheDocument();
    expect(screen.queryByText('Organic Wheat')).not.toBeInTheDocument();
  });

 // --- UNIT TEST: SORTING FUNCTIONS ---
  test('Function: Sort Logic - sorts by Price Low and Rating', async () => {
    await setup();
    const sortSelect = screen.getByRole('combobox');

    // 1. Test Price: Low to High
    fireEvent.change(sortSelect, { target: { value: 'priceLow' } });
    
    // We filter out "Market Filters" by looking for headings that are NOT that specific text
    let titles = screen.getAllByRole('heading', { level: 3 })
      .map(h => h.textContent)
      .filter(text => text !== "Market Filters"); // Ignore the sidebar heading

    expect(titles[0]).toBe('Fresh Tomato'); // 1200 is lowest

    // 2. Test Farmer Rating (Highest first)
    fireEvent.change(sortSelect, { target: { value: 'rating' } });
    
    titles = screen.getAllByRole('heading', { level: 3 })
      .map(h => h.textContent)
      .filter(text => text !== "Market Filters");

    expect(titles[0]).toBe('Basmati Rice'); // 4.8 is highest
  });
  
  // --- UNIT TEST: HELPER FUNCTION (getCropImage) ---
  test('Function: getCropImage Logic - assigns correct helper images', async () => {
    const riceOnly = [{ ...mockProducts[0], imageUrl: null }]; // Force helper function
    fetch.mockResolvedValueOnce({ json: async () => riceOnly });
    
    render(<BrowserRouter><CartProvider><Marketplace /></CartProvider></BrowserRouter>);
    
    const img = await screen.findByRole('img');
    // Verify it used the Rice Unsplash link from helper
    expect(img.getAttribute('src')).toContain('photo-1586201375761-83865001e31c');
  });

  // --- UNIT TEST: CART INTERACTION ---
  test('Function: addToCart - triggers context function on click', async () => {
    await setup();
    const cartButtons = screen.getAllByTitle(/Add to Cart/i);
    
    await act(async () => {
      fireEvent.click(cartButtons[0]);
    });

    // Verify context triggered an alert (since no user is logged in during test)
    expect(global.alert).toHaveBeenCalledWith("Please login to add items to cart");
  });

  // --- UNIT TEST: NAVIGATION ---
  test('Function: navigate - routes to details page correctly', async () => {
    await setup();
    const detailsButtons = screen.getAllByText(/Details/i);
    
    fireEvent.click(detailsButtons[0]);
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});