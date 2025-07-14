import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleFilterSidebarClose } from '@/redux/features/shop-filter-slice';

const StatusFilter = ({ setCurrPage, shop_right = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const status = ['On sale', 'In Stock'];

  // Get current status from query params
  const params = new URLSearchParams(location.search);
  const currentStatus = params.get('status');

  // handle status route
  const handleStatusRoute = (status) => {
    setCurrPage(1);
    navigate(`/${shop_right ? 'shop-right-sidebar' : 'shop'}?status=${status.toLowerCase().replace('&', '').split(' ').join('-')}`);
    dispatch(handleFilterSidebarClose());
  };
  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Product Status</h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-checkbox">
          <ul className="filter-items filter-checkbox">
            {status.map((s, i) => (
              <li key={i} className="filter-item checkbox">
                <input id={s} type="checkbox" checked={currentStatus === s.toLowerCase().replace('&', '').split(' ').join('-')} readOnly />
                <label onClick={() => handleStatusRoute(s)} htmlFor={s}>
                  {s}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
