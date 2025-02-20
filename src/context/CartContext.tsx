import { createContext, useReducer, ReactNode, useEffect } from "react";
import { cartReducer, cartInitialState, CartState } from "../reducers/cartReducer";
import { CartProduct } from "../interfaces/CartProduct";

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: number) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const saveCartToLocalStorage = (cart: CartProduct[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// 🔹 Se asegura que devuelva un objeto de tipo CartState
const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem("cart");
  return cart ? { cart: JSON.parse(cart) } : cartInitialState;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, getCartFromLocalStorage());

  useEffect(() => {
    saveCartToLocalStorage(state.cart);
  }, [state.cart]); // 🔹 Se accede correctamente a state.cart

  const addToCart = (product: CartProduct) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const incrementItem = (id: number) => {
    dispatch({ type: "INCREMENT_ITEM", payload: id });
  };

  const decrementItem = (id: number) => {
    dispatch({ type: "DECREMENT_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart, // 🔹 Se usa state.cart en lugar de state directamente
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
