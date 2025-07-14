import React from "react";
import menu_data from "@/data/menu-data";
import { Link } from "react-router-dom";

import { useGetSuggestedProductsQuery } from "@/redux/features/productApi";
import { HomeNewArrivalPrdLoader } from "@/components/loader";
import ErrorMsg from "@/components/common/error-msg";
import ProductItem from "@/components/products/beauty/product-item";
import { useSelector } from "react-redux";

// instagram data

const Menus = () => {
  const { data: products, isError, isLoading } = useGetSuggestedProductsQuery();
  const { user } = useSelector((state) => state.auth);

  let content = null;

  if (isLoading) {
    content = <HomeNewArrivalPrdLoader loading={isLoading} />;
  }

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }

  if (!isLoading && !isError && products?.length > 0) {
    const product_items = products;

    content = (
      <div className="row">
        {product_items.slice(0, 4).map((item) => (
          <div key={item.id} className="col-md-3">
            <ProductItem product={item} />
          </div>
        ))}
      </div>
    );
  } else {
    // If there are no products or an error occurs, set content to an empty array
    content = [];
  }
  return (
    <ul>
      {menu_data
        .filter((menu) => menu.restrictedTo.includes(user?.role))
        .map((menu) =>
          menu.homes ? (
            <li key={menu.id} className="">
              <Link to={menu.link}>{menu.title}</Link>
            </li>
          ) : menu.products ? (
            <li key={menu.id} className="has-dropdown has-mega-menu ">
              <Link to={menu.link}>{menu.title}</Link>
              <ul className="tp-submenu tp-mega-menu mega-menu-style-2">
                {menu.product_pages.map((p, i) => (
                  <li key={i} className="has-dropdown">
                    <Link to={p.link} className="mega-menu-title">
                      {p.title}
                    </Link>
                    <ul className="tp-submenu">
                      {p.mega_menus.map((m, i) => (
                        <li key={i}>
                          <Link to={m.link}>{m.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ) : menu.sub_menu ? (
            <li key={menu.id} className="has-dropdown">
              <Link to={menu.link}>{menu.title}</Link>
              <ul className="tp-submenu">
                {menu.sub_menus.map((b, i) => (
                  <li key={i}>
                    <Link to={b.link}>{b.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={menu.id}>
              <Link to={menu.link}>{menu.title}</Link>
            </li>
          )
        )}
    </ul>
  );
};

export default Menus;
