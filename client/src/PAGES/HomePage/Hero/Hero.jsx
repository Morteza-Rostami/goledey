import React, { useRef } from 'react'
import PropTypes from 'prop-types'

//css
import styles from './Hero.module.scss';
// import './Hero.css';

// swiper js
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from "swiper/react";
// siwper css
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from "swiper";
import { IconButton } from '@mui/material';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import useWindowDimensions from '../../../HOOKS/useWindowDimensions';
import CONST from '../../../CONSTANTS/CONST';

// array of hero images:
const images = [
  './images/banners/Ad-banner52.jpg', 
  './images/banners/Ad-banner61.jpg', 
  './images/banners/Ad-banner71.jpg']

const Hero = ({ }) => {
  // reference to swiper:
  const swiperRef = useRef();
  // window width and height
  const { width, height } = useWindowDimensions();


  return (
    <div 
      className={`${styles.hero}`}
    >
      <div
        className={`${styles.inner}`}
      >

      <div
        className={`${styles.swipe_wrap}`}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          //loop={true}
          mousewheel={true}
          cssMode={true}
          pagination
          //Autoplay,
          modules={[ Autoplay, Pagination, Navigation]}
          className="swiper-container"
          //onSlideChange={() => console.log('slide change')}
          /* store swiper ref */
          onSwiper={(swiper) => swiperRef.current = swiper}

          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          autoHeight={true}
        >

          {
            images ?
              images.map((pic, inx) => {
                return (
                <SwiperSlide 
                  key={inx} 
                  virtualIndex={inx}
                >
                  <img src={`${pic}`} alt="" />
                </SwiperSlide>
                )
              })
            : ''
          }

        </Swiper>
        
        <IconButton 
          className={`${styles.arrow_l}`}
          onClick={() => swiperRef.current.slidePrev()}
        >
          <MdKeyboardArrowLeft className={`${styles.ico}`}/>
        </IconButton>
        <IconButton 
          className={`${styles.arrow_r}`}
          onClick={() => swiperRef.current.slideNext()}
        >
          <MdKeyboardArrowRight className={`${styles.ico}`}/>
        </IconButton >
      </div> {/* swipe_wrap */}

      </div>
      {/* <img src="./images/hero_1.webp" alt="" /> */}

    </div>
  )
}

Hero.propTypes = {}

export default Hero