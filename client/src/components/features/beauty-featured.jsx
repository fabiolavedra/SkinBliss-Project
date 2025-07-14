import React from 'react';
import { Link } from 'react-router-dom';
// internal
import featured_1 from '@assets/img/product/featured/featured-1.png';
import featured_2 from '@assets/img/product/featured/featured-2.png';
import featured_3 from '@assets/img/product/featured/featured-3.png';

// featured data
const featured_data = [
  {
    id: 1,
    img: featured_1,
    title: (
      <>
        Matte Liquid <br /> Lipstick & Lip Liner
      </>
    ),
    subtitle: 'Molestias internos et commodi tempora dolores sapiente sed iste.',
    save: 72,
  },
  {
    id: 2,
    img: featured_2,
    title: (
      <>
        Crushed Liquid <br /> Lip - Cherry Crush
      </>
    ),
    subtitle: 'Molestias internos et commodi tempora dolores sapiente sed iste.',
    save: 98,
  },
  {
    id: 3,
    img: featured_3,
    title: (
      <>
        Mega Waterproof <br /> Concealer - 125 Bisque
      </>
    ),
    subtitle: 'Molestias internos et commodi tempora dolores sapiente sed iste.',
    save: 133,
  },
];

const BeautyFeatured = () => {
  return (
    <section className="tp-featured-area pt-60 pb-60">
      <div className="container">
        <div className="row">
          {featured_data.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="tp-featured-item mb-30">
                <div className="tp-featured-thumb mb-25">
                  <img src={item.img} alt="featured" />
                </div>
                <div className="tp-featured-content">
                  <h4 className="tp-featured-title">{item.title}</h4>
                  <p>{item.subtitle}</p>
                  <div className="tp-featured-save">
                    Save <span>${item.save}</span>
                  </div>
                  <Link to="/shop" className="tp-featured-btn">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyFeatured;
