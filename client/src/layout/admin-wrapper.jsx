import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// internal
import BackToTopCom from '@/components/common/back-to-top';
import Loader from '@/components/loader/loader';
import { useGetUserQuery } from '@/redux/features/auth/authApi';

const AdminWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    if ((!user && !isLoading) || isError) {
      navigate('/login');
      return;
    }

    if (user?.role === 'user') {
      navigate('/');
    }
  }, [user, navigate, isLoading, isError]);

  return !user ? (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Loader spinner="fade" loading={!user} />
    </div>
  ) : (
    <div id="wrapper">
      {children}
      <BackToTopCom />
    </div>
  );
};

export default AdminWrapper;
