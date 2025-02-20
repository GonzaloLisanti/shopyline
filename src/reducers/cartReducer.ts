import { CartProduct } from "../interfaces/CartProduct";

export interface CartState {
  cart: CartProduct[];
}

// Función para obtener el carrito desde localStorage
const getCartFromLocalStorage = (): CartProduct[] => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

// Estado inicial cargado desde localStorage
export const cartInitialState: CartState = {
  cart: getCartFromLocalStorage(),
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartProduct }
  | { type: "REMOVE_FROM_CART"; payload: number } // id del producto
  | { type: "INCREMENT_ITEM"; payload: number }   // id del producto
  | { type: "DECREMENT_ITEM"; payload: number }   // id del producto
  | { type: "CLEAR_CART" };

export function cartReducer(state: CartState, action: CartAction): CartState {
  let newCart: CartProduct[];

  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
    
      if (existingProductIndex !== -1) {
        // Si el producto ya existe, solo incrementamos la cantidad
        newCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un producto nuevo, aseguramos que tenga una cantidad de 1
        newCart = [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      break;
    }
    

    case "REMOVE_FROM_CART":
      newCart = state.cart.filter((item) => item.id !== action.payload);
      break;

    case "INCREMENT_ITEM":
      newCart = state.cart.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      break;

    case "DECREMENT_ITEM":
      newCart = state.cart.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      break;

    case "CLEAR_CART":
      newCart = [];
      break;

    default:
      return state;
  }

  // Guardamos en localStorage cada vez que cambia el carrito
  localStorage.setItem("cart", JSON.stringify(newCart));
  
  return { cart: newCart };
}
