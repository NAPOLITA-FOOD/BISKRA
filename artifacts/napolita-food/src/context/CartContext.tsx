import { createContext, useContext, useReducer, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  price: number;
  quantity: number;
  size?: string; // for pizza: S/M/L
  image: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction = 
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (i) => i.id === action.item.id && i.size === action.item.size
      );
      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return { ...state, items: newItems, isOpen: true };
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }], isOpen: true };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = (item: Omit<CartItem, 'quantity'>) => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQty = (id: string, qty: number) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        total,
        itemCount,
        addItem,
        removeItem,
        updateQty,
        openCart,
        closeCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
