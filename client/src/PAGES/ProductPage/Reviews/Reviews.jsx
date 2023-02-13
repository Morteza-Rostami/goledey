import React from "react";
import { useState, useRef, useEffect } from "react";
import ContainerA from "../../../COMPONENTS/containers/ContainerA";

// components 
import ReviewCard from './ReviewCard/ReviewCard';

//css
import styles from './Reviews.module.scss';
// icons
import { Button, IconButton } from "@mui/material";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import { useDispatch, useSelector } from "react-redux";
import { clearReviews, readReviews } from "../../../ACTIONS/reviewActions";
import CONST from "../../../CONSTANTS/CONST";
import ReviewsDialog from "./ReviewsDialog/ReviewsDialog";

import HorizLine from '../../../COMPONENTS/HorizLine/HorizLine';
import { useLocation } from "react-router-dom";
import Inner from "../../../COMPONENTS/Inner/Inner";

const ICON_SIZE = 15;

// let getReviews = true;
const Reviews = ({ 
  product,
  slug,
}) => {
  const reviews = useSelector(state => state.reviewsStore?.reviews);
  const [page, setPage] = useState(1);
  const swiperRef = useRef();
  const dispatch = useDispatch();

  const loc = useLocation();

  //is: location url change -> clear reviews
  useEffect(() => {
    dispatch(clearReviews());
  }, [loc]);

  useEffect(() => {
    dispatch(readReviews(slug, page, CONST.reviewsLim));
  }, []);

  // if: no reviews => show nothing
  if (!reviews.length) return <></>;

  return (
    <div
      className={`${styles.reviews} center-contain`}
    >
      <div 
        className={`${styles.inner} contain`}
      >
        <div
          className={`${styles.head_wrap}`}
        >
          <h2
            className={`${styles.head}`}
          >
            نظرات شما
          </h2>
        </div> {/* head_wrap */}

        <section
          className={`${styles.preview}`}
        >
          {
            reviews?.length 
              ?
              reviews.map((rev, inx) => {
                if (inx < 2) {
                  return (<ReviewCard review={rev} key={rev._id}/>)
                } 
                else return ''
              })
              : ''
          }
        </section>   
        
        <Inner
          css={styles.inner2}
        >
          <section
            className={`${styles.more}`}
          >
            <ReviewsDialog 
              //reviews={reviews}
              slug={slug}
            />
          </section>
          
          
          <HorizLine styles={styles}/>
        </Inner>
      </div> {/* inner */}

    </div>
  )
}

// default props
Reviews.defaultProps = {
  product : {}
}

export default Reviews;
