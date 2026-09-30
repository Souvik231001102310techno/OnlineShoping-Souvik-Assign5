import { useCart } from "../../context/CartContext";
import "./TopBar.css";

const TopBar = ({ onCartClick }) => {
  const {
    cartCount,
    subtotal
  } = useCart();

  return (
    <nav className="topbar">

      <div className="brand">

        <div className="brand-icon">
          S
        </div>

        <div className="brand-info">

          <h2>
            Shopora
          </h2>

          <span>
            Smart Shopping Experience
          </span>

        </div>

      </div>

      <div className="topbar-right">

        <div className="secure-badge">
          <i></i>
          SECURE SHOPPING
        </div>

        <button
          type="button"
          className="cart-button"
          onClick={onCartClick}
        >

          <span className="cart-symbol">
            🛒
          </span>

          <div className="cart-info">

            <strong>
              Cart
            </strong>

            <small>
              ₹{subtotal.toLocaleString("en-IN")}
            </small>

          </div>

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}

        </button>

      </div>

    </nav>
  );
};

export default TopBar;