import React from 'react'

// css
import styles from './ShortDesc.module.scss';

import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";

import FrontHelp from '../../../../HELPERS/frontHelp';

import { MdStarRate } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import HorizLine from '../../../../COMPONENTS/HorizLine/HorizLine';

import Inner from '../../../../COMPONENTS/Inner/Inner';

/* render html safe */
import { Markup } from "react-render-markup";


const ShortDesc = ({
  product,
  cssName
}) => {
  // number of product.reviews
  //const reviewsLen = useSelector(state => state.reviewsStore.reviewsLen);


  return (
    <div
    className={`${styles.short_d} ${cssName.shortdesc}`}>
      <Inner
        css={styles.inner}
      >
      {/* categories */}
      <Breadcrumbs 
      className={`${styles.bread}`}
      aria-label="breadcrumb">
        {
          Object.keys(product).length
          ? (
            product.categories.map((cat) => (
              <Link 
              to={`/shop?mCat=${cat.slug}`}
              underline="hover" 
              color="inherit" 
              //href="" 
              key={cat._id}>
                {cat.name}
              </Link>
            ))
          ) : ''
        }
      </Breadcrumbs>

      {/* name */}
      <h1 
      className={`${styles.name}`}>
        { FrontHelp.truncate(product.name, 30) }
      </h1>

      {/* rating */}
      <p
      className={`${styles.rate}`}>
        <span className={`${styles.ave}`}>
          <span>{product.aveRate}</span>
          <MdStarRate className={`${styles.ico}`}/>
        </span> 
        <span className={`${styles.reviews_len}`}>
          ({product.numOfReviews}) نظر
        </span>
      </p>

      {/* line */}
      <HorizLine/>

      {/* short discription */}
      <div 
        className={`${styles.short_desc}`}
      >
        {
          <Markup markup={product.shortDesc} />
        }
      </div>
      </Inner>
    </div>
  )
}

export default ShortDesc