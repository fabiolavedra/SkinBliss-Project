import React, { useEffect } from 'react';
// internal
import BackToTopCom from '@/components/common/back-to-top';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/loader/loader';
import { useGetUserQuery } from '@/redux/features/auth/authApi';

const NoAuthWrapper = ({ children }) => {
  const { data: user, isLoading, isError } = useGetUserQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading && !isError) {
      navigate('/');
    }
  }, [user, navigate, isLoading, isError]);

  return (isLoading || user) && !isError ? (
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

export default NoAuthWrapper;
