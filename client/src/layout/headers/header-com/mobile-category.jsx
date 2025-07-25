import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// internal
import { useGetShowCategoryQuery } from '@/redux/features/categoryApi';
import ErrorMsg from '@/components/common/error-msg';
import Loader from '@/components/loader/loader';

const MobileCategory = ({ isCategoryActive, categoryType }) => {
  const { data: categories, isError, isLoading } = useGetShowCategoryQuery(categoryType);
  const [isActiveSubMenu, setIsActiveSubMenu] = useState('');
  const navigate = useNavigate();

  // handleOpenSubMenu
  const handleOpenSubMenu = (title) => {
    if (title === isActiveSubMenu) {
      setIsActiveSubMenu('');
    } else {
      setIsActiveSubMenu(title);
    }
  };

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
  if (!isLoading && !isError && categories?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.length > 0) {
    const category_items = categories;
    content = category_items.map((item) => (
      <li className="has-dropdown" key={item.id}>
        <a className="cursor-pointer" onClick={() => handleCategoryRoute(item.name)}>
          {item.photo && (
            <span>
              <img src={item.photo} alt="cate img" width={50} height={50} />
            </span>
          )}
          {item.name}
          {item.children && (
            <button onClick={() => handleOpenSubMenu(item.name)} className="dropdown-toggle-btn">
              <i className="fa-regular fa-angle-right"></i>
            </button>
          )}
        </a>

        {item.children && (
          <ul className={`tp-submenu ${isActiveSubMenu === item.name ? 'active' : ''}`}>
            {item.children.map((child, i) => (
              <li key={i} onClick={() => handleCategoryRoute(child, 'children')}>
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

export default MobileCategory;
