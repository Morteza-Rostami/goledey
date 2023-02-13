import React from 'react'

// css
import styles from './TCardOne.module.scss';
import PropTypes from 'prop-types';
import TomanIco from '../../../SVG/TomanIco';
import FrontHelp from '../../../HELPERS/frontHelp';
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';


const TCardOne = ({ item, color }) => {
  // is img loaded
  const [isImgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className={`${styles.tcard_one}`}
    >
      <div
        className={styles.img__box}
      >
        {
          !isImgLoaded &&
          <Skeleton 
            className={`${styles.skelet}`}
            variant="rounded" 
            // width={210} 
            // height={150} 
          />
        }
        <img 
        className={`${styles.skelet}`}
        src={item.pictures[0]} 
        alt="" 
        //onLoad={() => setImgLoaded(true)} 
        onLoadCapture={() => setImgLoaded(true)}
        style={{
          height: !isImgLoaded ? 0 : 'auto',
        }}
        />
      </div> {/* img__box */}
      <div
        className={`${styles.overlay}`}
        style={{ background: color }}
      >
        <p>
          {
            FrontHelp.formatMoney(item.price)
          } 
        </p>
        <TomanIco/>
      </div>
    </div>
  )
}

TCardOne.propTypes = {
  item: PropTypes.object,
}

export default TCardOne;