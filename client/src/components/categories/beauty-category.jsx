import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// internal
import ErrorMsg from '../common/error-msg';
import { ArrowRightSm, ArrowRightSmTwo } from '@/svg';
import { useGetShowCategoryQuery } from '@/redux/features/categoryApi';
import { HomeThreeCategoryLoader } from '../loader';
const BeautyCategory = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();

  // handle category route
  const handleCategoryRoute = (title) => {
    navigate(`/shop?category=${title.toLowerCase().replace('&', '').split(' ').join('-')}`);
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <HomeThreeCategoryLoader loading={isLoading} />;
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
      <div key={item.id} className="col-lg-3 col-sm-6">
        <div className="tp-category-item-3 p-relative black-bg text-center z-index-1 fix mb-30">
          <div className="tp-category-thumb-3 include-bg" style={{ backgroundImage: `url(${item.photo})` }}></div>
          <div className="tp-category-content-3 transition-3">
            <h3 className="tp-category-title-3">
              <a className="cursor-pointer" onClick={() => handleCategoryRoute(item.name)}>
                {item.name}
              </a>
            </h3>
            <span className="tp-categroy-ammount-3">{item.product?.length} Products</span>
            <div className="tp-category-btn-3">
              <a onClick={() => handleCategoryRoute(item.name)} className="cursor-pointer tp-link-btn tp-link-btn-2">
                View Now
                <ArrowRightSm />
              </a>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      <section className="tp-category-area pt-95">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-6 col-md-8">
              <div className="tp-section-title-wrapper-3 mb-45">
                <span className="tp-section-title-pre-3">Product Collection</span>
                <h3 className="tp-section-title-3">Discover our products</h3>
              </div>
            </div>
            <div className="col-lg-6 col-md-4">
              <div className="tp-category-more-3 text-md-end mb-55">
                <Link to="/shop" className="tp-btn">
                  Shop All Products <ArrowRightSmTwo />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">{content}</div>
        </div>
      </section>
    </>
  );
};

export default BeautyCategory;
