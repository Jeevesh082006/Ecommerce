import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  getDiscountedPrice,
} from "../features/cart/cartSlice";

import {
  toggleWishlist,
  selectIsInWishlist,
} from "../features/wishlist/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInWishlist = useSelector((state) =>
    selectIsInWishlist(state, product.id)
  );

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const discountedPrice = getDiscountedPrice(product.price);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );

    navigate("/cart");
  };

  const handleWishlist = (e) => {
    e.stopPropagation();

    dispatch(toggleWishlist(product));
  };

  return (
    <div className="product-card">

      <div className="product-image-container">

        <button
          className={`wishlist-button ${
            isInWishlist ? "wishlist-active" : ""
          }`}
          onClick={handleWishlist}
          title={
            isInWishlist
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {isInWishlist ? "♥" : "♡"}
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          onClick={() =>
            navigate(`/product/${product.id}`)
          }
        />

      </div>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3
          className="product-title"
          onClick={() =>
            navigate(`/product/${product.id}`)
          }
        >
          {product.title}
        </h3>

        <div className="rating">
          ⭐ {product.rating?.rate || "N/A"}
        </div>

        <div className="discount-label">
          10% OFF
        </div>

        <div className="price-section">

          <span className="original-price">
            ${Number(product.price).toFixed(2)}
          </span>

          <span className="discounted-price">
            ${discountedPrice.toFixed(2)}
          </span>

        </div>

        {cartItem ? (
          <div className="quantity-stepper">

            <button
              onClick={() =>
                dispatch(decreaseQuantity(product.id))
              }
            >
              −
            </button>

            <span>{cartItem.quantity}</span>

            <button
              onClick={() =>
                dispatch(increaseQuantity(product.id))
              }
            >
              +
            </button>

          </div>
        ) : (
          <button
            className="add-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}

      </div>
    </div>
  );
}

export default ProductCard;