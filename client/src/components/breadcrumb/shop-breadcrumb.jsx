import React from 'react';
import { Link } from 'react-router-dom';

const ShopBreadcrumb = ({ title, subtitle }) => {
  return (
    <>
      <section className="breadcrumb__area include-bg pt-100 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3 className="breadcrumb__title">{title}</h3>
                <div className="breadcrumb__list">
                  <span>
                    <Link to="/">Home</Link>
                  </span>
                  <span>{subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopBreadcrumb;
