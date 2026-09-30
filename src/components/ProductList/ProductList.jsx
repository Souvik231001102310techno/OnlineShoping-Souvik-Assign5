import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = () => {
  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
};

export default ProductList;