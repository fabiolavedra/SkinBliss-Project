import React from "react";
import ErrorMsg from "../common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { useNavigate } from 'react-router-dom';
import ShopCategoryLoader from "../loader/shop/shop-category-loader";

const ShopCategoryArea = () => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const navigate = useNavigate();
  // handle category route
  const handleCategoryRoute = (title) => {
    navigate(
      `/shop?category=${title.toLowerCase().replace("&", "").split(" ").join("-")}`,
    );
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
      <div key={item.id} className="col-lg-3 col-sm-6">
        <div
          className="tp-category-main-box mb-25 p-relative fix"
          style={{ backgroundColor: "#F3F5F7" }}
        >
          <div className="tp-category-main-content">
            <h3
              className="tp-category-main-title pb-1"
              onClick={() => handleCategoryRoute(item.name)}
            >
              <a className="cursor-pointer">{item.name}</a>
            </h3>
            <span className="tp-category-main-item">
              {item.product?.length} Products
            </span>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      <section className="tp-category-area pb-120">
        <div className="container">
          <div className="row">{content}</div>
        </div>
      </section>
    </>
  );
};

export default ShopCategoryArea;
