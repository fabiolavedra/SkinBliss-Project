import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { EffectFade } from 'swiper/modules';
import slider_bg_1 from '@assets/img/slider/3/slider-1.jpg';
import { ArrowNext, ArrowPrev } from '@/svg';

const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  effect: 'fade',
  navigation: {
    nextEl: '.tp-slider-3-button-next',
    prevEl: '.tp-slider-3-button-prev',
  },
  pagination: {
    el: '.tp-slider-3-dot',
    clickable: true,
  },
};

// slider data
const slider_data = [
  {
    id: 1,
    bg: slider_bg_1,
    subtitle: 'Winter Collection 2023',
    title: 'Elevate your beauty, NATURALLY',
  },
];

const BeautyBanner = () => {
  return (
    <>
      <section className="tp-slider-area p-relative z-index-1">
        <Swiper {...slider_setting} modules={[Navigation, EffectFade, Pagination]} className="tp-slider-active-3 swiper-container">
          {slider_data.map((item) => (
            <SwiperSlide key={item.id} className="tp-slider-item-3 tp-slider-height-3 p-relative black-bg d-flex align-items-center">
              <div className="tp-slider-thumb-3 include-bg" style={{ backgroundImage: `url(${item.bg})` }}></div>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-6 col-lg-6 col-md-8">
                    <div className="tp-slider-content-3">
                      <h3 className="tp-slider-title-3">{item.title}</h3>

                      <div className="tp-slider-btn-3">
                        <Link to="/shop" className="tp-btn tp-btn-border tp-btn-border-white">
                          Discover Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="tp-swiper-dot tp-slider-3-dot d-sm-none"></div>
          <div className="tp-slider-arrow-3 d-none d-sm-block">
            <button type="button" className="tp-slider-3-button-prev">
              <ArrowPrev />
            </button>
            <button type="button" className="tp-slider-3-button-next">
              <ArrowNext />
            </button>
          </div>
        </Swiper>
      </section>
    </>
  );
};

export default BeautyBanner;
