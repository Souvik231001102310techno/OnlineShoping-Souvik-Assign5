import {
  createContext,
  useContext,
  useMemo,
  useReducer
} from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  coupon: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1
                }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1
          }
        ]
      };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1
                }
              : item
          )
          .filter(item => item.quantity > 0)
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          item => item.id !== action.payload
        )
      };

    case "APPLY_COUPON":
      return {
        ...state,
        coupon: action.payload
      };

    case "REMOVE_COUPON":
      return {
        ...state,
        coupon: null
      };

    case "CLEAR_CART":
      return {
        cart: [],
        coupon: null
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const addToCart = product => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product
    });
  };

  const increaseQuantity = id => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: id
    });
  };

  const decreaseQuantity = id => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: id
    });
  };

  const removeFromCart = id => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id
    });
  };

  const applyCoupon = coupon => {
    dispatch({
      type: "APPLY_COUPON",
      payload: coupon
    });
  };

  const removeCoupon = () => {
    dispatch({
      type: "REMOVE_COUPON"
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART"
    });
  };

  const subtotal = useMemo(() => {
    return state.cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [state.cart]);

  const cartCount = useMemo(() => {
    return state.cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [state.cart]);

  const discount = useMemo(() => {
    if (!state.coupon) {
      return 0;
    }

    return subtotal * state.coupon.discount;
  }, [subtotal, state.coupon]);

  const taxableAmount =
    subtotal - discount;

  const gst = taxableAmount * 0.18;

  const grandTotal =
    taxableAmount + gst;

  const value = {
    cart: state.cart,
    coupon: state.coupon,
    subtotal,
    cartCount,
    discount,
    gst,
    grandTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};