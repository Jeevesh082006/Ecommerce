import {
  useDispatch,
  useSelector,
} from "react-redux";

import { Link } from "react-router-dom";

import CartItemRow from "../../components/CartItemRow";

import {
  clearCart,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  selectTotalSavings,
} from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const items =
    useSelector(selectCartItems);

  const totalItems =
    useSelector(selectTotalItems);

  const subtotal =
    useSelector(selectTotalPrice);

  const totalSavings =
    useSelector(
      selectTotalSavings
    );

  const shipping =
    subtotal >= 100
      ? 0
      : 5;

  const total =
    subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="page">

        <div className="container empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <span className="empty-label">
            YOUR CART
          </span>

          <h1>
            Your cart is empty
          </h1>

          <p>
            Looks like you haven't
            added anything yet.
          </p>

          <Link
            to="/"
            className="continue-button"
          >
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="page">

      <div className="container">

        <div className="cart-heading">

          <div>
            <button
              type="button"
              className="back-button"
              onClick={() =>
                window.history.back()
              }
            >
              ← Continue shopping
            </button>

            <h1>
              Your Cart
            </h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>
          </div>

          <button
            type="button"
            className="clear-button"
            onClick={() =>
              dispatch(
                clearCart()
              )
            }
          >
            Clear cart
          </button>

        </div>

        <div className="cart-layout">

          <div className="cart-items">

            {items.map(
              (item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                />
              )
            )}

          </div>

          <aside className="order-summary">

            <div className="summary-header">
              <h2>
                Order Summary
              </h2>

              <span>
                {totalItems} items
              </span>
            </div>

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <strong>
                ${subtotal.toFixed(2)}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Discount
              </span>

              <strong className="discount-text">
                -$
                {totalSavings.toFixed(
                  2
                )}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Shipping
              </span>

              <strong
                className={
                  shipping === 0
                    ? "free-text"
                    : ""
                }
              >
                {shipping === 0
                  ? "FREE"
                  : "$5.00"}
              </strong>
            </div>

            {subtotal < 100 && (
              <div className="shipping-progress">

                <p>
                  Add $
                  {(100 -
                    subtotal
                  ).toFixed(2)}{" "}
                  more for FREE
                  shipping.
                </p>

                <div className="progress-bar">
                  <div
                    style={{
                      width: `${Math.min(
                        (subtotal /
                          100) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>

              </div>
            )}

            {subtotal >= 100 && (
              <div className="free-shipping-box">
                ✓ You've unlocked
                FREE shipping!
              </div>
            )}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ${total.toFixed(2)}
              </strong>

            </div>

            <button
              type="button"
              className="checkout-button"
            >
              Proceed to Checkout
            </button>

            <p className="secure-checkout">
              🔒 Secure checkout
            </p>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Cart;