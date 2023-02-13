import React, { useRef, useState, useMemo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
//import { Pagination } from "swiper";
import { FreeMode, Pagination } from "swiper";


// css
import styles from './OrderImgs.module.scss';

const OrderImgs = ({
  pictures,
}) => {

  const settings = useMemo(() => {
    
  });

  return (
    <div
      className={`${styles.order__imgs}`}
    >

<>
      <Swiper
        pagination={false}
        slidesPerView={3}
        spaceBetween={10}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          430: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          570: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
        }}
        //centeredSlides={true}
        freeMode={true}

        //modules={[Pagination, ]}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {
          pictures &&
          pictures.map((pic, i) => (
            <SwiperSlide key={i}>
              <img src={pic} alt="" />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
        {/* {
          pictures &&
          pictures.map((pic, i) => {
            console.log(pic)
            return (
              <img 
                src={pic} 
                key={i}
              />
            )
          })
        } */}
        {/* {
          [...Array(2).keys()].map(() => (
            <div>
              <img src="https://picsum.photos/200/300" alt="" />
            </div>
          ))
        } */}
        
        
    </div>
  )
}

export default OrderImgs