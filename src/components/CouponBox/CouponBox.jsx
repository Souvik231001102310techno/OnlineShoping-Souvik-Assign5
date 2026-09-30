import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./CouponBox.css";

const CouponBox = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const {
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const coupons = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    SHOP15: 0.15
  };

  const handleApply = () => {
    const normalized =
      code.trim().toUpperCase();

    if (!normalized) {
      setMessage(
        "Please enter a coupon code."
      );
      return;
    }

    if (!coupons[normalized]) {
      setMessage(
        "Invalid coupon code."
      );
      return;
    }

    applyCoupon({
      code: normalized,
      discount: coupons[normalized]
    });

    setMessage(
      `${normalized} applied successfully.`
    );

    setCode("");
  };

  const handleRemove = () => {
    removeCoupon();
    setMessage("");
  };

  return (
    <div className="coupon-box">

      <div className="coupon-heading">

        <span>
          🏷️
        </span>

        <div>
          <h3>
            Have a coupon?
          </h3>

          <p>
            Try SAVE10, SAVE20 or SHOP15
          </p>
        </div>

      </div>

      {coupon ? (

        <div className="coupon-applied">

          <div>
            <strong>
              {coupon.code}
            </strong>

            <span>
              {coupon.discount * 100}% discount applied
            </span>
          </div>

          <button
            type="button"
            onClick={handleRemove}
          >
            Remove
          </button>

        </div>

      ) : (

        <div className="coupon-form">

          <input
            type="text"
            value={code}
            onChange={event =>
              setCode(event.target.value)
            }
            onKeyDown={event => {
              if (event.key === "Enter") {
                handleApply();
              }
            }}
            placeholder="Enter coupon"
          />

          <button
            type="button"
            onClick={handleApply}
          >
            Apply
          </button>

        </div>

      )}

      {message && !coupon && (
        <p className="coupon-message">
          {message}
        </p>
      )}

    </div>
  );
};

export default CouponBox;