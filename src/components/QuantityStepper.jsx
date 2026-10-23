function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="quantity-stepper">

      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span>
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>

    </div>
  );
}

export default QuantityStepper;