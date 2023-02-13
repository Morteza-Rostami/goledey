import React from "react";
import { useState, useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from "react-router-dom";

// redux store:
import { useDispatch, useSelector } from "react-redux";
// actions
import { readProduct } from "../../ACTIONS/productActions";
import { readReviews } from "../../ACTIONS/reviewActions";

// components
import LayoutB from "../../LAYOUTS/LayoutB/LayoutB";
import Reviews from "./Reviews/Reviews";
// import ReviewCrud from "./ReviewCrud/ReviewCrud";
import RelProducts from "./RelProducts/RelProducts";
import GridA from "./GridA/GridA";

import LeaveReview from "./LeaveReview/LeaveReview";
import HeaderMob from "../../LAYOUTS/LayoutB/HeaderMob/HeaderMob";
import Header from "../../LAYOUTS/Header/Header";
import Footer from "../../LAYOUTS/Footer/Footer";

import AutoLayout from '../../LAYOUTS/AutoLayout/AutoLayout';
import FooterMobB from "../../LAYOUTS/LayoutB/FooterMobB/FooterMobB";

//css
import styles from './productPage.module.scss';
import HorizLine from "../../COMPONENTS/HorizLine/HorizLine";


const Product = ({  }) => {
  let firstRender = true;
  // get url prameters: => to get: /product/:id => returns: { id: 2 }
  const { slug } = useParams();
  const product = useSelector((state) => 
    state.productsStore.product);
  // reviews
  const reviews = useSelector(state => state.reviewsStore.reviews);

  const dispatch = useDispatch();
  //const loc = useLocation();

  // run also: if slug url changes
  // useEffect(() => {
  //   dispatch(readProduct(slug));
  // }, [loc]);

  // get single product data by slug:
  useEffect(() => {
   
    
    dispatch(readProduct(slug));
    window.scrollTo(0, 0);
      
  }, []);

  

  return (
   
    // <LayoutB itemSlug={slug} product={product}>
    <AutoLayout
      headerMob={<HeaderMob/>}
      headerDec={<Header/>}
      footerMob={<FooterMobB itemSlug={slug} product={product}/>}
      footerDec={<Footer/>}
    >
      <div className={`${styles.product__page}`}>

        <GridA product={product} itemSlug={slug}/>
        
        <Reviews 
          product={product}
          slug={slug}
        />
        
        <LeaveReview 
          product={product}
        />
        
        <RelProducts products={product?.relateds}/>
      </div> {/* product__page */}

    </AutoLayout>
  )
}

export default Product;