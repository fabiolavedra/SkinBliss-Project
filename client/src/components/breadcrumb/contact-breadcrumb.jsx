import React from 'react';
import { Link } from 'react-router-dom';

const ContactBreadcrumb = () => {
  return (
    <section className="breadcrumb__area include-bg text-center pt-95 pb-50">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <h3 className="breadcrumb__title">Keep In Touch with Us</h3>
              <div className="breadcrumb__list">
                <span>
                  <Link to="/">Home</Link>
                </span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBreadcrumb;
