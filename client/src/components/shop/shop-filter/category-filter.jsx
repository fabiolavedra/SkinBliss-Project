import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// internal
import ErrorMsg from '@/components/common/error-msg';
import { useGetShowCategoryQuery } from '@/redux/features/categoryApi';
import { handleFilterSidebarClose } from '@/redux/features/shop-filter-slice';
import ShopCategoryLoader from '@/components/loader/shop/shop-category-loader';

const CategoryFilter = ({ setCurrPage, shop_right = false }) => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get current category from query params
  const params = new URLSearchParams(location.search);
  const currentCategory = params.get('category');

  // handle category route
  const handleCategoryRoute = (title) => {
    setCurrPage(1);
    navigate(`/${shop_right ? 'shop-right-sidebar' : 'shop'}?category=${title.toLowerCase().replace('&', '').split(' ').join('-')}`);
    dispatch(handleFilterSidebarClose());
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.length > 0) {
    const category_items = categories;
    content = category_items.map((item) => (
      <li key={item.id}>
        <a onClick={() => handleCategoryRoute(item.name)} style={{ cursor: 'pointer' }} className={currentCategory === item.name.toLowerCase().replace('&', '').split(' ').join('-') ? 'active' : ''}>
          {item.name} <span>{item.product?.length}</span>
        </a>
      </li>
    ));
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
