import { useState } from "react";
import CartItem from "../CartItem/CartItem";
import CouponBox from "../CouponBox/CouponBox";
import { useCart } from "../../context/CartContext";
import "./BillingSection.css";

const BillingSection = () => {
  const [orderPlaced, setOrderPlaced] =
    useState(false);

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

  if (orderPlaced) {
    return (
      <section
        id="billing"
        className="billing-section"
      >
        <div className="order-success">

          <div className="success-icon">
            ✓
          </div>

          <span>
            ORDER CONFIRMED
          </span>

          <h2>
            Thank You!
          </h2>

          <p>
            Your order has been successfully
            placed.
          </p>

          <div className="order-id">
            ORDER #
            {Date.now()
              .toString()
              .slice(-6)}
          </div>

          <button
            type="button"
            onClick={() =>
              setOrderPlaced(false)
            }
          >
            Continue Shopping →
          </button>

        </div>
      </section>
    );
  }

  return (
    <section
      id="billing"
      className="billing-section"
    >

      <div className="billing-heading">

        <div>
          <span>
            03
          </span>

          <p>
            SHOPPING CART
          </p>

          <h2>
            Billing <strong>Summary</strong>
          </h2>
        </div>

        <div className="billing-status">
          SECURE CHECKOUT
        </div>

      </div>

      {cart.length === 0 ? (

        <div className="empty-billing">

          <div>
            🛒
          </div>

          <h3>
            Your cart is empty
          </h3>

          <p>
            Add products from the collection
            to see your billing summary.
          </p>

        </div>

      ) : (

        <div className="billing-layout">

          <div className="billing-products">

            <div className="billing-card-header">
              <h3>
                Your Items
              </h3>

              <span>
                {cart.length} products
              </span>
            </div>

            <div className="billing-items">

              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

            <CouponBox />

          </div>

          <div className="billing-summary">

            <div className="summary-top">
              <span>
                ORDER SUMMARY
              </span>

              <h3>
                Payment Details
              </h3>
            </div>

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
                    minimumFractionDigits: 2
                  }
                )}
              </strong>
            </div>

            <div className="summary-divider"></div>

            <div className="billing-grand-total">

              <span>
                Grand Total
              </span>

              <strong>
                ₹
                {grandTotal.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2
                  }
                )}
              </strong>

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
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <div className="secure-payment">
              🔒 Secure & encrypted checkout
            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default BillingSection;