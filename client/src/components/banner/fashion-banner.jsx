import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Navigation } from 'swiper/modules';
// internal
import slider_img_1 from '@assets/img/slider/2/slider-1.png';
import slider_img_2 from '@assets/img/slider/2/slider-2.png';
import slider_img_3 from '@assets/img/slider/2/slider-3.png';
import slider_shape from '@assets/img/slider/2/shape/shape-1.png';
import thumb_shape_1 from '@assets/img/slider/2/shape/shape-2.png';
import thumb_shape_2 from '@assets/img/slider/2/shape/shape-3.png';

// slider data
const slider_data = [
  {
    id: 1,
    subtitle: 'New Arrivals 2023',
    title: 'The Clothing Collection',
    img: slider_img_1,
  },
  {
    id: 2,
    subtitle: 'Best Selling 2023',
    title: 'The Summer Collection',
    img: slider_img_2,
  },
  {
    id: 3,
    subtitle: 'Winter Has Arrived',
    title: 'Amazing New designs',
    img: slider_img_3,
  },
];

// slider setting
const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 30,
  effect: 'fade',
  navigation: {
    nextEl: '.tp-slider-2-button-next',
    prevEl: '.tp-slider-2-button-prev',
  },
  pagination: {
    el: '.tp-slider-2-dot',
    clickable: true,
  },
};

const FashionBanner = () => {
  return (
    <section className="tp-slider-area p-relative z-index-1">
      <Swiper {...slider_setting} modules={[Navigation, EffectFade, Pagination]} className="tp-slider-active-2 swiper-container">
        {slider_data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="tp-slider-2-item p-relative">
              <div className="tp-slider-2-thumb">
                <img src={item.img} alt="slider" />
                <img src={slider_shape} alt="shape" className="tp-slider-2-shape" />
                <img src={thumb_shape_1} alt="shape" className="tp-slider-2-thumb-shape-1" />
                <img src={thumb_shape_2} alt="shape" className="tp-slider-2-thumb-shape-2" />
              </div>
              <div className="tp-slider-2-content">
                <span>{item.subtitle}</span>
                <h2>{item.title}</h2>
                <Link to="/shop" className="tp-slider-2-btn">
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FashionBanner;
