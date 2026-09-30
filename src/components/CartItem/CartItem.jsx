import { useCart } from "../../context/CartContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  return (
    <div className="cart-item">

      <div className="cart-item-image">
        {item.emoji}
      </div>

      <div className="cart-item-info">

        <h3>
          {item.name}
        </h3>

        <span>
          ₹{item.price.toLocaleString("en-IN")}
        </span>

        <div className="cart-quantity">

          <button
            type="button"
            onClick={() =>
              decreaseQuantity(item.id)
            }
          >
            −
          </button>

          <strong>
            {item.quantity}
          </strong>

          <button
            type="button"
            onClick={() =>
              increaseQuantity(item.id)
            }
          >
            +
          </button>

        </div>

      </div>

      <div className="cart-item-right">

        <strong>
          ₹
          {(
            item.price *
            item.quantity
          ).toLocaleString("en-IN")}
        </strong>

        <button
          type="button"
          className="remove-item"
          onClick={() =>
            removeFromCart(item.id)
          }
        >
          ×
        </button>

      </div>

    </div>
  );
};

export default CartItem;