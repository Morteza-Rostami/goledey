import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Pagination } from "swiper";
import { useSelector } from "react-redux";

export default function OrderedPics() {
  //const cart = JSON.parse(localStorage.getItem('cart'));
  const cart = useSelector(state => state.cartStore);

  return (
    <>
      <Swiper
        slidesPerView={10}
        spaceBetween={5}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          640: {
            slidesPerView: 10,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 10,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 10,
            spaceBetween: 10,
          },
        }}
        //Pagination
        modules={[]}
        className="mySwiper"
      >
        {
          cart?.products.length
          ? (
            cart.products.map((item, i) => (
              <SwiperSlide key={i}>
                <img 
                  src={item.product.pictures[0]} 
                  alt="" 
                  style={{
                    maxWidth: '100%',
                    aspectRatio: '2 / 2',
                    objectFit: 'cover'
                  }}  
                />
              </SwiperSlide>

            ))
          ) : ''
        }
      </Swiper>
    </>
  );
}
