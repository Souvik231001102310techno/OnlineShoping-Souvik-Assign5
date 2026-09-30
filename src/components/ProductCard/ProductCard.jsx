import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({
  product,
  index
}) => {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    cart
  } = useCart();

  const cartItem = cart.find(
    item => item.id === product.id
  );

  const quantity =
    cartItem?.quantity || 0;

  return (
    <article
      className="product-card"
      style={{
        "--delay": `${index * 0.08}s`
      }}
    >
      <div className="product-shine"></div>

      <span className="product-category">
        {product.category}
      </span>

      <div className="product-image">
        <div className="product-image-glow"></div>

        <span>
          {product.emoji}
        </span>
      </div>

      <div className="product-content">

        <h3>
          {product.name}
        </h3>

        <p>
          {product.description}
        </p>

        <div className="product-bottom">

          <div className="product-price">

            <small>
              PRICE
            </small>

            <strong>
              ₹{product.price.toLocaleString("en-IN")}
            </strong>

          </div>

          {!cartItem ? (

            <button
              type="button"
              className="add-product-button"
              onClick={() =>
                addToCart(product)
              }
            >
              Add to Cart
            </button>

          ) : (

            <div className="card-quantity">

              <button
                type="button"
                onClick={() =>
                  decreaseQuantity(product.id)
                }
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  increaseQuantity(product.id)
                }
              >
                +
              </button>

            </div>

          )}

        </div>

      </div>

      {cartItem && (
        <div className="added-indicator">
          ✓ In Cart
        </div>
      )}

    </article>
  );
};

export default ProductCard;