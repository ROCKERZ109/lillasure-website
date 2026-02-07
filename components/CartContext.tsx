"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from "react";
import type { Product, CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; variantId?: string; variantName?: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; variantId?: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, variantId?: string, variantName?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Helper: Get cart item key
const getCartKey = (productId: string, variantId?: string) => {
  return variantId ? `${productId}-${variantId}` : productId;
};

// ✅ Helper: Check if items match
const itemsMatch = (item: CartItem, productId: string, variantId?: string) => {
  return item.product.id === productId && item.variantId === variantId;
};

// ✅ Helper: Get item price (base + variant diff)
const getItemPrice = (item: CartItem) => {
  const basePrice = item.product.price;
  if (item.variantId && item.product.variants) {
    const variant = item.product.variants.find(v => v.id === item.variantId);
    return basePrice + (variant?.priceDiff || 0);
  }
  return basePrice;
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, variantId, variantName } = action.payload;
      
      const existingItem = state.items.find(
        (item) => itemsMatch(item, product.id, variantId)
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            itemsMatch(item, product.id, variantId)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { 
          product, 
          quantity: 1,
          variantId,
          variantName
        }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => !itemsMatch(item, action.payload.productId, action.payload.variantId)
        ),
      };

    case "UPDATE_QUANTITY": {
      const { productId, variantId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !itemsMatch(item, productId, variantId)
          ),
        };
      }
      
      return {
        ...state,
        items: state.items.map((item) =>
          itemsMatch(item, productId, variantId)
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "LOAD_CART":
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem("Cart");
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      window.localStorage.setItem("Cart", JSON.stringify(state.items));
    }
  }, [state.items, isInitialized]);

  // ✅ Updated: accepts variant params
  const addItem = (product: Product, variantId?: string, variantName?: string) => {
    dispatch({ type: "ADD_ITEM", payload: { product, variantId, variantName } });
  };

  // ✅ Updated: accepts variantId
  const removeItem = (productId: string, variantId?: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
  };

  // ✅ Updated: accepts variantId
  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, variantId, quantity } });
  };

  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // ✅ Updated: considers variant price diff
  const totalAmount = state.items.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}