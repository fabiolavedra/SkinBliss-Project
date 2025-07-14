import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// internal
import { Close, Minus, Plus } from '@/svg';
import { add_cart_product, quantityDecrement } from '@/redux/features/cartSlice';
import { remove_wishlist_product } from '@/redux/features/wishlist-slice';

const WishlistItem = ({ product }) => {
  const { id, img, title, price } = product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const isAddToCart = cart_products.find((item) => item.id === id);
  const dispatch = useDispatch();
  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    dispatch(remove_wishlist_product(prd));
  };
  return (
    <tr>
      <td className="tp-cart-img">
        <Link to={`/product-details/${id}`}>
          <img src={img} alt="product img" width={70} height={100} />
        </Link>
      </td>
      <td className="tp-cart-title">
        <Link to={`/product-details/${id}`}>{title}</Link>
      </td>
      <td className="tp-cart-price">
        <span>${price.toFixed(2)}</span>
      </td>
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span onClick={() => handleDecrement(product)} className="tp-cart-minus">
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" value={isAddToCart ? isAddToCart?.orderQuantity : 0} readOnly />
          <span onClick={() => handleAddProduct(product)} className="tp-cart-plus">
            <Plus />
          </span>
        </div>
      </td>

      <td className="tp-cart-add-to-cart">
        <button onClick={() => handleAddProduct(product)} type="button" className="tp-btn tp-btn-2 tp-btn-blue">
          Add To Cart
        </button>
      </td>

      <td className="tp-cart-action">
        <button onClick={() => handleRemovePrd({ title, id: id })} className="tp-cart-action-btn">
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default WishlistItem;
