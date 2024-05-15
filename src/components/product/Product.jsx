import AddToCart from "../addToCart/AddToCart";
import './product.css';

const Product = ({ product }) => (
  <div className="product-item">
    <img className="product-image" src={product.image ?? "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"} alt={product.name} />
    <div className="product-details">
      <div className="product-title">{product.name}</div>
      <div className="buy-item">
        <div className="product-price">Price: ${product.price}</div>
        <AddToCart product={product} />
      </div>
    </div>
  </div>
);

export default Product;
