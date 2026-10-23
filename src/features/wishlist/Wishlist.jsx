import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectWishlistItems,
  removeFromWishlist,
  clearWishlist,
} from "./wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(selectWishlistItems);

  console.log("Wishlist items:", wishlistItems);

  return (
    <main className="page-container">

      <div className="page-heading-row">
        <div>
          <h1>My Wishlist ❤️</h1>

          <p>
            {wishlistItems.length} product
            {wishlistItems.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <button
            className="clear-button"
            onClick={() => dispatch(clearWishlist())}
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-cart">

          <div className="empty-icon">
            ❤️
          </div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            Click the heart button on a product to save it here.
          </p>

          <button
            className="checkout-button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>
      ) : (
        <div className="wishlist-grid">

          {wishlistItems.map((product) => (
            <div
              className="wishlist-card"
              key={product.id}
            >

              <div className="wishlist-image-container">

                <button
                  className="wishlist-remove-button"
                  onClick={() =>
                    dispatch(removeFromWishlist(product.id))
                  }
                >
                  ♥
                </button>

                <img
                  src={product.image}
                  alt={product.title}
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                />

              </div>

              <div className="wishlist-info">

                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.title}</h3>

                <div className="rating">
                  ⭐ {product.rating?.rate || "N/A"}
                </div>

                <p className="wishlist-price">
                  ${Number(product.price).toFixed(2)}
                </p>

                <button
                  className="add-button"
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                >
                  View Product
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </main>
  );
}

export default Wishlist;