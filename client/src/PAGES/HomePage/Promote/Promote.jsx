import React, { useMemo } from 'react'

import styles from './Promote.module.scss';
import Inner from '../../../COMPONENTS/Inner/Inner';

//client/src/SVG/promoteSVG/EasyPayIcon.js
import EasyPayIco from '../../../SVG/promoteSVG/EasyPayIco'
import LezatIco from '../../../SVG/promoteSVG/LezatIco'
import ManzelIco from '../../../SVG/promoteSVG/ManzelIco'
import OneDayIco from '../../../SVG/promoteSVG/OneDayIco'
import PickDateIco from '../../../SVG/promoteSVG/PickDateIco'
import PostalIco from '../../../SVG/promoteSVG/PostalIco'
import ProSlot from './ProSlot/ProSlot';


const Promote = () => {

  const slots = useMemo(() => {
    return [
      {
        icon: <LezatIco/>,
        text: 'لذت از خرید',
      },
      {
        icon: <PostalIco/>,
        text: 'کارت پستال',
      },
      {
        icon: <ManzelIco/>,
        text: 'تحویل درب منزل',
      },
      {
        icon: <PickDateIco/>,
        text: 'تایین زمان ارسال',
      },
      {
        icon: <EasyPayIco/>,
        text: 'پرداخت آسان',
      },
      {
        icon: <OneDayIco/>,
        text: 'ارسال از یک روز کاری',
      },
      
    ]
  }, []);

  return (
    <div
      className={`${styles.promote} center-contain`}
    >
      <Inner
        css={`${styles.inner} contain`}
      >
        {
          slots.length
          ? (
            slots.reverse().map((slot, i) => <ProSlot slot={slot} key={i}/>)
          ) : ''
        }
      </Inner>
    </div>
  )
}

export default Promote