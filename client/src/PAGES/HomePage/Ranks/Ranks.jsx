

import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";

// css 
import styles from './Ranks.module.scss';

// global css
import '../../../THEME/GLOBAL.css';
// import "!style-loader!css-loader!../../../src/THEME/GLOBAL.css";
// client/src/THEME/GLOBAL.css
// client/src/PAGES/HomePage/Ranks/Ranks.jsx

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import SecHeader from "../SecHeader/SecHeader";

// cards
import TCardOne from "../TCardOne/TCardOne";
import CONST from "../../../CONSTANTS/CONST";
import TCardTwo from "../TCardTwo/TCardTwo";
import useWindowDimensions from "../../../HOOKS/useWindowDimensions";


const Ranks = ({ products, name, cardName, bgColor, color, link }) => {
  const {width, height} = useWindowDimensions();
 
  return (
    <div 
      className={`${styles.ranks} ranks center-contain`}
    >
      <div
        className={`${styles.inner} contain`}
      >
      <SecHeader link={link} name={name} color={color}/>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        
        //centeredSlides={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Pagination]}
        className="mySwiper"
        loop={false}
        //showsPagination={false}

        style={{
          backgroundColor: bgColor, 
        }}

        /* responsive */
        breakpoints={{
          [CONST.MOBILE400]: {
            slidesPerView: 3,
          },
          [CONST.MOBILE_90]: {
            slidesPerView: 4
          },
          [CONST.MOBILE]: {
            slidesPerView: 5
          },
          [1200]: {
            slidesPerView: 7
          }
        }}
      >
        {
          products?.length
          ? (
            products.map((item, inx) => (
              <SwiperSlide
                key={inx} 
                virtualIndex={inx}
              >
                <Link to={`/product/${item.slug}`}>
                  {
                    // cardName === CONST.TCARDONE
                    <TCardOne item={item} key={inx} color={color}/>
                    // : (<TCardTwo item={item} key={inx}/>)
                  }
                  
                </Link>
              </SwiperSlide>
            ))
          ) : ''
        }
        
        
      </Swiper>
      </div> {/* inner */}
    </div>
  );
}

/* props types */
Ranks.propTypes = {
  products: PropTypes.array,
}

export default Ranks;