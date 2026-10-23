import { useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

import QuantityStepper from "./QuantityStepper";

function CartItemRow({
  item,
}) {
  const dispatch = useDispatch();

  const lineTotal =
    item.price *
    item.quantity;

  const lineSavings =
    (item.originalPrice -
      item.price) *
    item.quantity;

  return (
    <article className="cart-item">

      <div className="cart-image-wrapper">

        <img
          src={item.image}
          alt={item.title}
          className="cart-item-image"
        />

      </div>

      <div className="cart-item-info">

        <span className="cart-category">
          {item.category}
        </span>

        <h3>
          {item.title}
        </h3>

        <div className="cart-price">

          <span className="cart-original-price">
            ${item.originalPrice.toFixed(2)}
          </span>

          <strong>
            ${item.price.toFixed(2)}
          </strong>

        </div>

        <p className="cart-saving">
          You save $
          {lineSavings.toFixed(2)}
        </p>

        <QuantityStepper
          quantity={item.quantity}
          onIncrease={() =>
            dispatch(
              increaseQuantity(
                item.id
              )
            )
          }
          onDecrease={() =>
            dispatch(
              decreaseQuantity(
                item.id
              )
            )
          }
        />

      </div>

      <div className="cart-item-total">

        <strong>
          ${lineTotal.toFixed(2)}
        </strong>

        <span>
          {item.quantity} × $
          {item.price.toFixed(2)}
        </span>

        <button
          type="button"
          className="remove-button"
          onClick={() =>
            dispatch(
              removeFromCart(
                item.id
              )
            )
          }
        >
          Remove
        </button>

      </div>

    </article>
  );
}

export default CartItemRow;