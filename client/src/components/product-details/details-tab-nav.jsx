import React, { useRef, useEffect, useState } from 'react';
import ReviewForm from '../forms/review-form';
import ReviewItem from './review-item';

const DetailsTabNav = ({ product }) => {
  const { id, desc, reviews } = product || {};
  const activeRef = useRef(null);
  const marker = useRef(null);
  const [active, setActive] = useState('description');
  // handleActive
  const handleActive = (e, id) => {
    setActive(id);
    if (e.target.classList.contains('active')) {
      marker.current.style.left = e.target.offsetLeft + 'px';
      marker.current.style.width = e.target.offsetWidth + 'px';
    }
  };
  useEffect(() => {
    if (activeRef.current?.classList.contains('active')) {
      marker.current.style.left = activeRef.current.offsetLeft + 'px';
      marker.current.style.width = activeRef.current.offsetWidth + 'px';
    }
  }, []);
  // nav item
  function NavItem({ active = false, id, title, linkRef }) {
    return (
      <button
        ref={linkRef}
        className={`nav-link ${active ? 'active' : ''}`}
        id={`nav-${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#nav-${id}`}
        type="button"
        role="tab"
        aria-controls={`nav-${id}`}
        aria-selected={active ? 'true' : 'false'}
        tabIndex="-1"
        onClick={(e) => handleActive(e, id)}
      >
        {title}
      </button>
    );
  }

  return (
    <>
      <div className="tp-product-details-tab-nav tp-tab">
        <nav>
          <div
            className="nav nav-tabs justify-content-center p-relative tp-product-tab"
            id="navPresentationTab"
            role="tablist"
          >
            <NavItem active={active === 'description'} linkRef={activeRef} id="description" title="Description" />
            <NavItem
              active={active === 'review'}
              linkRef={activeRef}
              id="review"
              title={`Reviews (${reviews.length})`}
            />

            <span ref={marker} id="productTabMarker" className="tp-product-details-tab-line"></span>
          </div>
        </nav>
        <div className="tab-content" id="navPresentationTabContent">
          {/* nav-desc */}
          <div
            className={`tab-pane fade ${active === 'description' ? 'show active' : ''} `}
            id="nav-desc"
            role="tabpanel"
            aria-labelledby="nav-desc-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-desc-wrapper pt-60">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-product-details-desc-item">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="tp-product-details-desc-content">
                          <p>{desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* review */}
          <div
            className={`tab-pane fade ${active === 'review' ? 'show active' : ''} `}
            id="nav-review"
            role="tabpanel"
            aria-labelledby="nav-review-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-review-wrapper pt-60">
              <div className="row">
                <div className="col-lg-6">
                  <div className="tp-product-details-review-statics">
                    {/* reviews */}
                    <div className="tp-product-details-review-list pr-110">
                      <h3 className="tp-product-details-review-title">Rating & Review</h3>
                      {reviews.length === 0 && (
                        <h3 className="tp-product-details-review-title">There are no reviews yet.</h3>
                      )}
                      {reviews.length > 0 && reviews.map((item) => <ReviewItem key={item.id} review={item} />)}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tp-product-details-review-form">
                    <h3 className="tp-product-details-review-form-title">Review this product</h3>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    {/* form start */}
                    <ReviewForm product_id={id} />
                    {/* form end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTabNav;
