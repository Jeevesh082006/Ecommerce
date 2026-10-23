import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  fetchProducts,
} from "./productsSlice";

import {
  addToCart,
  getDiscountedPrice,
} from "../cart/cartSlice";

import ProductGallery from "../../components/ProductGallery";
import QuantityStepper from "../../components/QuantityStepper";

function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items,
    status,
    error,
  } = useSelector(
    (state) => state.products
  );

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const product =
    items.find(
      (item) =>
        item.id === Number(id)
    );

  if (status === "loading") {
    return (
      <main className="page">
        <div className="container loading-container">
          <div className="loader"></div>
          <p>
            Loading product...
          </p>
        </div>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="page">
        <div className="container error-box">
          <h2>
            Unable to load product
          </h2>

          <p>
            {error}
          </p>

          <button
            className="add-button"
            onClick={() =>
              dispatch(
                fetchProducts()
              )
            }
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page">
        <div className="container error-box">
          <h2>
            Product not found
          </h2>
        </div>
      </main>
    );
  }

  const discountedPrice =
    getDiscountedPrice(
      product.price
    );

  const savings =
    Number(
      (
        product.price -
        discountedPrice
      ).toFixed(2)
    );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
      })
    );

    navigate("/cart");
  };

  return (
    <main className="page">

      <div className="container">

        <button
          type="button"
          className="back-button"
          onClick={() =>
            navigate("/")
          }
        >
          ← Back to products
        </button>

        <div className="product-detail">

          <ProductGallery
            image={product.image}
            title={product.title}
          />

          <div className="product-info">

            <span className="detail-category">
              {product.category}
            </span>

            <div className="detail-discount">
              10% OFF
            </div>

            <h1>
              {product.title}
            </h1>

            <div className="detail-rating">
              ★{" "}
              {product.rating?.rate}

              <span>
                (
                {product.rating?.count}
                {" "}reviews)
              </span>
            </div>

            <div className="detail-price-box">

              <span className="detail-original-price">
                ${product.price.toFixed(2)}
              </span>

              <div className="detail-price">
                $
                {discountedPrice.toFixed(
                  2
                )}
              </div>

              <span className="detail-save">
                You save $
                {savings.toFixed(2)}
              </span>

            </div>

            <p className="description">
              {product.description}
            </p>

            <div className="detail-quantity">

              <span>
                Quantity
              </span>

              <QuantityStepper
                quantity={quantity}
                onIncrease={() =>
                  setQuantity(
                    (value) =>
                      value + 1
                  )
                }
                onDecrease={() =>
                  setQuantity(
                    (value) =>
                      Math.max(
                        1,
                        value - 1
                      )
                  )
                }
              />

            </div>

            <button
              type="button"
              className="add-cart-large"
              onClick={
                handleAddToCart
              }
            >
              Add {quantity} to cart
            </button>

            <p className="free-shipping-hint">
              ✓ Free shipping on
              orders of $100 or more
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetail;