import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// internal
import { Box, DeliveryTwo, Processing, Truck } from '@/svg';
import { userLoggedOut } from '@/redux/features/auth/authSlice';
import { useLogoutMutation } from '@/redux/features/auth/authApi';

const NavProfileTab = ({ orderData }) => {
  const { user } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  return (
    <div className="profile__main">
      <div className="profile__main-top pb-80">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="profile__main-inner d-flex flex-wrap align-items-center">
              <div className="profile__main-content">
                <h4 className="profile__main-title">Welcome Mr. {user?.name}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile__main-logout text-sm-end">
              <button onClick={() => logout()} className="cursor-pointer tp-logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProfileTab;
