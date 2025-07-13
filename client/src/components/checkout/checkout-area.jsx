import React from 'react';
import { Link } from 'react-router-dom';
// internal
import CheckoutBillingArea from './checkout-billing-area';
import CheckoutCoupon from './checkout-coupon';
import CheckoutLogin from './checkout-login';
import CheckoutOrderArea from './checkout-order-area';
import useCheckoutSubmit from '@/hooks/use-checkout-submit';
import useCartInfo from '@/hooks/use-cart-info';

const CheckoutArea = () => {
  const checkoutData = useCheckoutSubmit();
  const { handleSubmit, submitHandler, register, errors } = checkoutData;
  const { cart_products } = useCartInfo();
  return (
    <>
      <section className="tp-checkout-area pb-120" style={{ backgroundColor: '#EFF1F5' }}>
        <div className="container">
          {cart_products?.cartProducts.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link to="/shop" className="tp-btn tp-btn-border tp-btn-border-white">
                Continue Shopping
              </Link>
            </div>
          )}
          {cart_products?.cartProducts.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7"></div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-lg-7">
                    <CheckoutBillingArea register={register} errors={errors} />
                  </div>
                  <div className="col-lg-5">
                    <CheckoutOrderArea checkoutData={checkoutData} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
