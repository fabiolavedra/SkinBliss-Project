import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// internal
import logo_white from "@assets/img/logo/skin-blis-2.png";
import { CartTwo, Logout, Menu, Search, User } from "@/svg";
import Menus from "./header-com/menus";
import useSticky from "@/hooks/use-sticky";
import SearchBar from "./header-com/search-bar";
import OffCanvas from "@/components/common/off-canvas";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import useCartInfo from "@/hooks/use-cart-info";
import { openCartMini } from "@/redux/features/cartSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

const HeaderThree = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();

  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`tp-header-area tp-header-style-transparent-white tp-header-transparent tp-header-sticky has-dark-logo tp-header-height ${
            sticky ? "header-sticky" : ""
          }`}
        >
          <div className="tp-header-bottom-3 pl-35 pr-35">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="logo">
                    <Link to="/">
                      <img
                        className="logo-light"
                        src={logo_white}
                        alt="logo"
                        style={{
                          width: "200px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                      <img
                        className="logo-dark"
                        src={logo_white}
                        alt="logo"
                        style={{
                          width: "200px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                  <div className="main-menu menu-style-3 p-relative d-flex align-items-center justify-content-center">
                    <nav className="tp-main-menu-content">
                      <Menus />
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button
                        onClick={() => setIsSearchOpen(true)}
                        type="button"
                        className="tp-header-action-btn tp-search-open-btn"
                      >
                        <Search />
                      </button>
                    </div>
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button
                        onClick={() => dispatch(openCartMini())}
                        type="button"
                        className="tp-header-action-btn cartmini-open-btn"
                      >
                        <CartTwo />
                        <span className="tp-header-action-badge">
                          {quantity}
                        </span>
                      </button>
                    </div>
                    <div className="tp-header-action-item">
                      <Link to="/profile" className="tp-header-action-btn">
                        <User />
                      </Link>
                    </div>
                    <div className="tp-header-action-item">
                      <button
                        onClick={() => logout()}
                        type="button"
                        className="tp-header-action-btn cartmini-open-btn"
                      >
                        <Logout />
                      </button>
                    </div>
                    <div className="tp-header-action-item d-lg-none">
                      <button
                        onClick={() => setIsCanvasOpen(true)}
                        type="button"
                        className="tp-header-action-btn tp-offcanvas-open-btn"
                      >
                        <Menu />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search bar start */}
      <SearchBar
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      {/* search bar end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="beauty"
      />
      {/* off canvas end */}
    </>
  );
};

export default HeaderThree;
