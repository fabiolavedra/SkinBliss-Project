import React from 'react';
import { Link } from 'react-router-dom';
// internal
import ErrorMsg from '@/components/common/error-msg';
import { useGetShowCategoryQuery } from '@/redux/features/categoryApi';
import CategoryListLoader from '@/components/loader/home/category-list-loader';

const PrdCategoryList = () => {
  const { data: categories, isError, isLoading } = useGetShowCategoryQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <CategoryListLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = categories.result;
    content = category_items.map((item) => (
      <li key={item.id}>
        <Link to={`/shop?category=${item.name}`}>{item.name}</Link>
      </li>
    ));
  }
  return <ul>{content}</ul>;
};

export default PrdCategoryList;
