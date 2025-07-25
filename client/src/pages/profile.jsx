import React from 'react';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import ProfileArea from '@/components/my-account/profile-area';
import { useGetAllOrdersQuery } from '@/redux/features/order/orderApi';
import Loader from '@/components/loader/loader';

const ProfilePage = () => {
  const { data: orderData, isLoading } = useGetAllOrdersQuery();

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <Loader loading={isLoading} />
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Profile" />
      <HeaderTwo style_2={true} />
      <ProfileArea orderData={orderData} />
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default ProfilePage;
