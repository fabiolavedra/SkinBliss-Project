import React from 'react';
import { useNavigate } from 'react-router-dom';
// internal
import { useGetShowCategoryQuery } from '@/redux/features/categoryApi';
import ErrorMsg from '@/components/common/error-msg';
import Loader from '@/components/loader/loader';

const HeaderCategory = ({ isCategoryActive, categoryType = 'electronics' }) => {
  const { data: categories, isError, isLoading } = useGetShowCategoryQuery(categoryType);
  const navigate = useNavigate();

  // handle category route
  const handleCategoryRoute = (title) => {
    navigate(`/shop?category=${title.toLowerCase().replace('&', '').split(' ').join('-')}`);
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
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
      <li className="has-dropdown" key={item.id}>
        <a className="cursor-pointer" onClick={() => handleCategoryRoute(item.parent)}>
          {item.photo && (
            <span>
              <img src={item.photo} alt="cate img" width={50} height={50} />
            </span>
          )}
          {item.parent}
        </a>

        {item.children && (
          <ul className="tp-submenu">
            {item.children.map((child, i) => (
              <li key={i} onClick={() => handleCategoryRoute(child)}>
                <a className="cursor-pointer">{child}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  }
  return <ul className={isCategoryActive ? 'active' : ''}>{content}</ul>;
};

export default HeaderCategory;
