// internal
import useCartInfo from '@/hooks/use-cart-info';

const CheckoutOrderArea = ({ checkoutData }) => {
  const { handleShippingCost, cartTotal = 0, stripe, isCheckoutSubmit, clientSecret, register, errors, showCard, setShowCard, shippingCost, discountAmount } = checkoutData;
  const { cart_products, total } = useCartInfo();
  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      <div className="tp-order-info-list">
        <ul>
          {/*  header */}
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {/*  item list */}
          {cart_products?.cartProducts?.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item?.productId?.name} <span> x {item?.quantity}</span>
              </p>
              <span>${item.productId?.price?.toFixed(2)}</span>
            </li>
          ))}

          {/*  shipping */}
          {/* <li className="tp-order-info-list-shipping">
            <span>Shipping</span>
            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_shipping"
                  type="radio"
                  name="shippingOption"
                />
                <label onClick={() => handleShippingCost(60)} htmlFor="flat_shipping">
                  Delivery: Today Cost :<span>$60.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                />
                <label onClick={() => handleShippingCost(20)} htmlFor="flat_rate">
                  Delivery: 7 Days Cost: <span>$20.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li> */}

          {/*  subtotal */}
          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </li>

          {/*  shipping cost */}
          <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>${shippingCost.toFixed(2)}</span>
          </li>

          {/* total */}
          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>${parseFloat(cartTotal).toFixed(2)}</span>
          </li>
        </ul>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button type="submit" disabled={isCheckoutSubmit} className="tp-checkout-btn w-100">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
