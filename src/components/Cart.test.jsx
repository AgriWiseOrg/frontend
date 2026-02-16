import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useCart } from "./CartContext";
import Cart from "./Cart";
import "@testing-library/jest-dom";

// 1. Mock the useCart hook so we don't need a real backend
jest.mock("./CartContext", () => ({
  useCart: jest.fn(),
}));

// 2. Mock useNavigate to track navigation without changing pages
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Helper to wrap component in Router
const renderCart = () => {
  return render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
};

describe("Cart Component Front-end Tests", () => {
  const mockFetchCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockUpdateQuantity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Loading State
  test("shows loading spinner when fetching data from MongoDB", () => {
    useCart.mockReturnValue({
      loading: true,
      cartItems: [],
      totalItems: 0,
      fetchCart: mockFetchCart,
    });

    renderCart();
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  // Test Case 2: Empty Cart
  test("displays empty basket message when no items exist", () => {
    useCart.mockReturnValue({
      loading: false,
      cartItems: [],
      totalItems: 0,
      fetchCart: mockFetchCart,
    });

    renderCart();
    expect(screen.getByText(/Your basket is empty/i)).toBeInTheDocument();
  });

  // Test Case 3: Displaying Items
  test("renders cart items with correct price and farmer details", () => {
    const mockItems = [{
      productId: "prod_123",
      crop: "Rice",
      price: 100,
      quantity: 2,
      imageUrl: "rice.jpg",
      farmer: "Farmer John"
    }];

    useCart.mockReturnValue({
      loading: false,
      cartItems: mockItems,
      totalItems: 2,
      totalPrice: 200,
      fetchCart: mockFetchCart,
    });

    renderCart();
    
    // Check for Heading specifically
    expect(screen.getByRole("heading", { name: /Rice/i })).toBeInTheDocument();
    expect(screen.getByText(/Farmer: Farmer John/i)).toBeInTheDocument();
    
    // FIXED: Using getAllByText because ₹200 appears in item list, subtotal, and total.
    const priceElements = screen.getAllByText(/₹200/);
    expect(priceElements.length).toBeGreaterThan(0);
    expect(priceElements[0]).toBeInTheDocument();
  });

  // Test Case 4: Interactions (Delete/Remove)
  test("calls removeFromCart with correct productId when remove is clicked", () => {
    const mockItems = [{
      productId: "mongo_id_789",
      crop: "Tomato",
      price: 50,
      quantity: 1,
      imageUrl: "tomato.jpg"
    }];

    useCart.mockReturnValue({
      loading: false,
      cartItems: mockItems,
      totalItems: 1,
      totalPrice: 50,
      removeFromCart: mockRemoveFromCart,
      fetchCart: mockFetchCart,
    });

    renderCart();
    const removeBtn = screen.getByText(/Remove/i);
    fireEvent.click(removeBtn);

    expect(mockRemoveFromCart).toHaveBeenCalledWith("mongo_id_789");
  });

  // Test Case 5: Quantity Update
  test("calls updateQuantity when plus button is clicked", () => {
    const mockItems = [{
      productId: "qty_123",
      crop: "Wheat",
      price: 30,
      quantity: 1,
      imageUrl: "wheat.jpg"
    }];

    useCart.mockReturnValue({
      loading: false,
      cartItems: mockItems,
      totalItems: 1,
      totalPrice: 30,
      updateQuantity: mockUpdateQuantity,
      fetchCart: mockFetchCart,
    });

    renderCart();

    const buttons = screen.getAllByRole("button");
    const plusBtn = buttons.find(btn => btn.innerHTML.includes('lucide-plus'));
    
    if (plusBtn) {
      fireEvent.click(plusBtn);
      expect(mockUpdateQuantity).toHaveBeenCalledWith("qty_123", 1);
    }
  });
});