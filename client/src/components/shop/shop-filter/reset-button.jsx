import { useNavigate } from 'react-router-dom';
import React from "react";

const ResetButton = ({ shop_right = false }) => {
  const navigate = useNavigate();
  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Reset Filter</h3>
      <button
        onClick={() =>
          navigate(`/${shop_right ? "shop-right-sidebar" : "shop"}`)
        }
        className="tp-btn"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default ResetButton;
