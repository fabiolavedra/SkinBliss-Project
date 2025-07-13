import React from 'react';
import { SmDot } from '@/svg';
import { Link } from 'react-router-dom';

const ProductDetailsBreadcrumb = ({ category, title }) => {
  return (
    <section className="breadcrumb__area breadcrumb__style-2 include-bg pt-50 pb-20">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <div className="breadcrumb__list has-icon">
                <span className="breadcrumb-icon">
                  <SmDot />{' '}
                </span>
                <span>
                  <Link to="/">Home</Link>
                </span>
                <span>
                  <Link to="/">{category}</Link>
                </span>
                <span>{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsBreadcrumb;
