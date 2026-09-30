import { useState } from "react";
import CartItem from "../CartItem/CartItem";
import CouponBox from "../CouponBox/CouponBox";
import { useCart } from "../../context/CartContext";
import "./CartPanel.css";

const CartPanel = ({ onClose }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    cart,
    subtotal,
    discount,
    gst,
    grandTotal,
    clearCart
  } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    setOrderPlaced(true);
    clearCart();
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const handlePanelClick = (event) => {
    event.stopPropagation();
  };

  if (orderPlaced) {
    return (
      <div
        className="cart-overlay"
        onClick={handleOverlayClick}
      >
        <aside
          className="cart-panel checkout-success-panel"
          onClick={handlePanelClick}
        >
          <button
            type="button"
            className="close-cart"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>

          <div className="checkout-success">
            <div className="success-icon">
              ✓
            </div>

            <span className="success-label">
              ORDER CONFIRMED
            </span>

            <h2>
              Thank You!
            </h2>

            <p>
              Your order has been successfully placed.
              Your products will be processed shortly.
            </p>

            <div className="order-number">
              <span>
                ORDER ID
              </span>

              <strong>
                #SHOP
                {Date.now()
                  .toString()
                  .slice(-6)}
              </strong>
            </div>

            <button
              type="button"
              className="continue-shopping"
              onClick={onClose}
            >
              Continue Shopping →
            </button>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div
      className="cart-overlay"
      onClick={handleOverlayClick}
    >
      <aside
        className="cart-panel"
        onClick={handlePanelClick}
      >
        <div className="cart-panel-top">
          <div>
            <span>
              SHOPPING CART
            </span>

            <h2>
              Your Cart
            </h2>
          </div>

          <button
            type="button"
            className="close-cart"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              🛒
            </div>

            <h3>
              Your cart is empty
            </h3>

            <p>
              Add some products to continue
              shopping.
            </p>

            <button
              type="button"
              className="start-shopping-button"
              onClick={onClose}
            >
              Start Shopping →
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            <CouponBox />

            <div className="summary">
              <div className="summary-row">
                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  Coupon Discount
                </span>

                <strong className="discount">
                  −₹
                  {discount.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                    }
                  )}
                </strong>
              </div>

              <div className="summary-row">
                <span>
                  GST (18%)
                </span>

                <strong>
                  ₹
                  {gst.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }
                  )}
                </strong>
              </div>

              <div className="grand-total">
                <span>
                  Grand Total
                </span>

                <strong>
                  ₹
                  {grandTotal.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }
                  )}
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout →
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartPanel;