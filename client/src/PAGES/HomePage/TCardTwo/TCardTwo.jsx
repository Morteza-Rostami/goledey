import React, { useState } from 'react'

// css
import styles from './TCardTwo.module.scss';
import PropTypes from 'prop-types';
import TomanIco from '../../../SVG/TomanIco';
import FrontHelp from '../../../HELPERS/frontHelp';
import { Skeleton } from '@mui/material';


const TCardTwo = ({ item }) => {
  const [isImgLoaded, setImgLoaded] = useState(false);


  return (
    <div
      className={`${styles.tcard_two}`}
    >
      <div
        className={styles.img__box}
      >
        {
          !isImgLoaded &&
          <Skeleton 
            className={`${styles.skelet}`}
            variant="circular" 
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

TCardTwo.propTypes = {
  item: PropTypes.object,
}

export default TCardTwo;