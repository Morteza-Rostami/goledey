import React from 'react'

//css
import styles from './GridA.module.scss';

import PicMob from "../GridA/PicMob/PicMob";
import ShortDesc from "../GridA/ShortDesc/ShortDesc";
import InfoMob from "../GridA/InfoMob/InfoMob";
import LongDesc from "../GridA/LongDesc/LongDesc";

import PicDec from '../GridA/PicDec/PicDec';
import InfoDec from '../GridA/InfoDec/InfoDec';
import HorizLine from '../../../COMPONENTS/HorizLine/HorizLine';

const GridA = ({
  product,
  itemSlug
}) => {
  return (
    <div
      className={`${styles.grida} center-contain`}
    >
      <div
        className={`${styles.inner} contain`}
      >
        <section
          className={`${styles.grid}`}
        >
          <PicMob product={product} cssName={styles}/>
          <PicDec product={product} cssName={styles} galleryID={'product-gallery'}/>
          <ShortDesc product={product} cssName={styles}/>
          <InfoMob product={product} cssName={styles}/>
          <InfoDec product={product} cssName={styles} itemSlug={itemSlug}/>
          <LongDesc product={product} cssName={styles}/>
        </section>

        <HorizLine css={styles.line}/>
      </div>
    </div>
  )
}

export default GridA