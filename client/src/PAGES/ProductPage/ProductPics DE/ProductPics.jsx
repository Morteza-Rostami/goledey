import React, { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

// css
import styles from './ProductPics.module.scss';
import { useRef, useState } from 'react';
import ContainerA from '../../../COMPONENTS/containers/ContainerA';

const ProductPics = ({ galleryID, product }) => {
  
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ContainerA
        pl={'1rem'}
        pr={'1rem'}
        maxW={'1200px'}
      >
        <div 
          id={galleryID}
          className={`pswp-gallery ${styles.product_pics}`} 
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
      </ContainerA>
    </div>
  );
  
}

export default ProductPics;
