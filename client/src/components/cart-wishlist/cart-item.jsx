import React from 'react';
import { Link } from 'react-router-dom';
// internal
import { Close, Minus, Plus } from '@/svg';
import { useRemoveProductFromCartMutation, useUpdateCartMutation } from '@/redux/features/cartApi';

const CartItem = ({ product }) => {
  const {
    title,
    productId: { price, photo: img, id, name },
    quantity = 0,
  } = product || {};

  const [deleteFromCart, {}] = useRemoveProductFromCartMutation();
  const [updateCart, {}] = useUpdateCartMutation();

  // handle add product
  const handleAddProduct = (prd) => {
    updateCart({
      productId: prd._id,
      quantity: quantity + 1,
    });
  };
  // handle decrement product
  const handleDecrement = (prd) => {
    updateCart({
      productId: prd._id,
      quantity: quantity - 1,
    });
  };

  // handle remove product
  const handleRemovePrd = (prd) => {
    deleteFromCart(prd);
  };

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link to={`/product-details/${id}`}>
          <img src={img} alt={title} width={70} height={100} />
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title">
        <Link to={`/product-details/${id}`}>{name}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>${(price * quantity).toFixed(2)}</span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span onClick={() => handleDecrement(product)} className="tp-cart-minus">
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" value={quantity} readOnly />
          <span onClick={() => handleAddProduct(product)} className="tp-cart-plus">
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action">
        <button onClick={() => handleRemovePrd({ id: id })} className="tp-cart-action-btn">
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
