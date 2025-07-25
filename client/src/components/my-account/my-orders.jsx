import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import React from 'react';

const MyOrders = ({ orderData }) => {
  const order_items = orderData;
  return (
    <div className="profile__ticket table-responsive">
      {!order_items ||
        (order_items?.length === 0 && (
          <div style={{ height: '210px' }} className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <i style={{ fontSize: '30px' }} className="fa-solid fa-cart-circle-xmark"></i>
              <p>You Have no order Yet!</p>
            </div>
          </div>
        ))}
      {order_items && order_items?.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Order Time</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {order_items.map((item, i) => (
              <tr key={i}>
                <th scope="row">#{item._id}</th>
                <td data-info="title">{dayjs(item.createdAt).format('MMMM D, YYYY')}</td>
                <td>
                  <Link to={`/order/${item._id}`} className="tp-logout-btn">
                    Invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
