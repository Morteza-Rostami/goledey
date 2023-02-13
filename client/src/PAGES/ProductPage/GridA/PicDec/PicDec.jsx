import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

// css
import styles from './PicDec.module.scss';
import { useRef, useState } from 'react';

import Grid from '../../../../COMPONENTS/Grid/Grid';

const PicDec = ({ 
  galleryID, 
  product ,
  cssName
}) => {
  

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div 
      className={`${styles.pic_dec} ${cssName.picdec} pic-dec`}
    >  
    <Grid 
      
      css={` ${styles.grid}`} 
    >
      <div 
      className={`${styles.main__img}`}
      >
        <img
          src={product?.pictures?.length ? product.pictures[0] : ''}
        />
        
      </div>

      <div
        id={galleryID}
        className={`pswp-gallery ${styles.images}`}
      >
        {
        
        product?.pictures?.length
        ? (
          product.pictures.map((imgUrl, index) => {
            let cssSel = `pic_${index}`;
            return(
              <a
                className={`${styles[cssSel]}`}
                href={imgUrl}
                data-pswp-width={1000}
                data-pswp-height={1000}
                key={galleryID + '-' + index}
                target="_blank"
                rel="noreferrer"
              >
                <img 
                  src={imgUrl} 
                  alt={product.name}
                />
              </a>
            )
          })
        ) : ''
        }
      </div>
    </Grid>
    </div>
  );
  
}

export default PicDec;
