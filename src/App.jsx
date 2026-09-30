import { useCart } from "./context/CartContext";
import TopBar from "./components/TopBar/TopBar";
import ProductList from "./components/ProductList/ProductList";
import BillingSection from "./components/BillingSection/BillingSection";
import "./App.css";

function App() {
  const {
    cartCount,
    subtotal
  } = useCart();

  const goToBilling = () => {
    const billing =
      document.getElementById("billing");

    if (billing) {
      billing.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const goToProducts = () => {
    const products =
      document.getElementById("products");

    if (products) {
      products.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <div className="app">

      <div className="background-grid"></div>

      <div className="background-orb orb-one"></div>
      <div className="background-orb orb-two"></div>
      <div className="background-orb orb-three"></div>

      <TopBar
        onCartClick={goToBilling}
      />

      <main>

        <section className="hero-section">

          <div className="hero-content">

            <span className="hero-badge">
              ONLINE SHOPPING CART
            </span>

            <h1>
              Shop <span>Smarter.</span>
            </h1>

            <p>
              Explore premium products, add your
              favourites to the cart, manage quantities
              and calculate discounts and GST
              automatically.
            </p>

            <div className="hero-actions">

              <button
                type="button"
                className="shop-button"
                onClick={goToProducts}
              >
                Explore Products →
              </button>

              <button
                type="button"
                className="hero-cart-button"
                onClick={goToBilling}
              >
                🛒 View Cart
              </button>

            </div>

            <div className="hero-stats">

              <div>
                <strong>
                  {cartCount}
                </strong>

                <span>
                  Items in Cart
                </span>
              </div>

              <div>
                <strong>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <span>
                  Cart Value
                </span>
              </div>

              <div>
                <strong>
                  18%
                </strong>

                <span>
                  GST Calculation
                </span>
              </div>

            </div>

          </div>

          <div className="hero-visual">

            <div className="visual-orbit orbit-a"></div>

            <div className="visual-orbit orbit-b"></div>

            <div className="shopping-bag">

              <div className="bag-handle"></div>

              <div className="bag-body">
                <span>
                  🛍️
                </span>
              </div>

            </div>

            <div className="floating-product product-one">
              📱
            </div>

            <div className="floating-product product-two">
              🎧
            </div>

            <div className="floating-product product-three">
              ⌚
            </div>

          </div>

        </section>

        <section
          id="products"
          className="products-section"
        >

          <div className="section-heading">

            <div>

              <span>
                01
              </span>

              <p>
                FEATURED COLLECTION
              </p>

              <h2>
                Discover <strong>Products</strong>
              </h2>

            </div>

            <div className="product-count">
              8 PRODUCTS
            </div>

          </div>

          <ProductList />

        </section>

        <BillingSection />

      </main>

    </div>
  );
}

export default App;