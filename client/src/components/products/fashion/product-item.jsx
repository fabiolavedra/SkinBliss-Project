import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { Link } from 'react-router-dom';
// internal
import { Cart, CompareThree, QuickView, Wishlist } from '@/svg';
import { handleProductModal } from '@/redux/features/productModalSlice';
import { add_cart_product } from '@/redux/features/cartSlice';
import { useAddProductToCartMutation } from '@/redux/features/cartApi';
import useCartInfo from '@/hooks/use-cart-info';

const ProductItem = ({ product, style_2 = false }) => {
  const { id, photo, name, reviews, price, discount, status } = product || {};
  const [ratingVal, setRatingVal] = useState(0);
  const { cart_products } = useCartInfo();
  const isAddedToCart = cart_products?.cartProducts?.some((prd) => prd?.product?.id === id);
  const dispatch = useDispatch();
  const [addToCart, {}] = useAddProductToCartMutation();

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    // dispatch(add_cart_product(prd));
    addToCart({
      productId: prd.id,
    });
  };

  return (
    <div className={`tp-product-item-2 ${style_2 ? '' : 'mb-40'}`}>
      <div className="tp-product-thumb-2 p-relative z-index-1 fix">
        <Link to={`/product-details/${id}`}>
          <img src={photo} alt="product img" width={284} height={302} />
        </Link>
        <div className="tp-product-badge">{status === 'out-of-stock' && <span className="product-hot">out-stock</span>}</div>
        {/* product action */}
        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            {isAddedToCart ? (
              <Link href="/cart" className={`tp-product-action-btn-2 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}>
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">View Cart</span>
              </Link>
            ) : (
              <button type="button" onClick={() => handleAddProduct(product)} className={`tp-product-action-btn-2 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`} disabled={status === 'out-of-stock'}>
                <Cart />
                <span className="tp-product-tooltip tp-product-tooltip-right">Add to Cart</span>
              </button>
            )}
            <button onClick={() => dispatch(handleProductModal(product))} className="tp-product-action-btn-2 tp-product-quick-view-btn">
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">Quick View</span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-content-2 pt-15">
        <h3 className="tp-product-title-2">
          <Link to={`/product-details/${id}`}>{name}</Link>
        </h3>
        <div className="tp-product-rating-icon tp-product-rating-icon-2">
          <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
        </div>
        <div className="tp-product-price-wrapper-2">
          {discount > 0 ? (
            <>
              <span className="tp-product-price-2 new-price">${price.toFixed(2)} </span>
              <span className="tp-product-price-2 old-price"> ${(Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2)}</span>
            </>
          ) : (
            <span className="tp-product-price-2 new-price">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
