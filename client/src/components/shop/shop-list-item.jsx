import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
// internal
import { Cart, CompareThree, QuickView, Wishlist } from '@/svg';
import { handleProductModal } from '@/redux/features/productModalSlice';
import { add_cart_product } from '@/redux/features/cartSlice';
import { add_to_wishlist } from '@/redux/features/wishlist-slice';
import { add_to_compare } from '@/redux/features/compareSlice';
import logo_white from '@assets/img/logo/skin-blis-2.png';

const ShopListItem = ({ product }) => {
  const { id, photo, category, title, reviews, price, discount, desc } = product || {};
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);
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
    dispatch(add_cart_product(prd));
  };

  return (
    <div className="tp-product-list-item d-md-flex">
      <div className="tp-product-list-thumb p-relative fix">
        <Link to={`/product-details/${id}`}>
          <img src={logo_white} alt="product img" width={350} height={310} />
        </Link>

        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            <button type="button" className="tp-product-action-btn-2 tp-product-quick-view-btn" onClick={() => dispatch(handleProductModal(product))}>
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">Quick View</span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-list-content">
        <div className="tp-product-content-2 pt-15">
          <h3 className="tp-product-title-2">
            <Link to={`/product-details/${id}`}>{title}</Link>
          </h3>
          <div className="tp-product-rating-icon tp-product-rating-icon-2">
            <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
          </div>
          <div className="tp-product-price-wrapper-2">
            {discount > 0 ? (
              <>
                <span className="tp-product-price-2 new-price">${price}</span>
                <span className="tp-product-price-2 old-price"> ${(Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2)}</span>
              </>
            ) : (
              <span className="tp-product-price-2 new-price">${price}</span>
            )}
          </div>
          <p>{desc.substring(0, 100)}</p>
          <div className="tp-product-list-add-to-cart">
            <button onClick={() => handleAddProduct(product)} className="tp-product-list-add-to-cart-btn">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopListItem;
