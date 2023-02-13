import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import styles from './TopHeaderAd.module.scss';

// icons
import { RiInstagramFill } from 'react-icons/ri';
import { BsTelegram } from 'react-icons/bs'
import { RiWhatsappFill } from 'react-icons/ri'
import CONST from '../../CONSTANTS/CONST';
import { IconButton } from '@mui/material';


const TopHeaderAd = props => {
  let doRender = false;
  const loc = useLocation();

  if (loc.pathname === '/' || loc.pathname === '/shop') doRender = true;

  //Top-Banner.gif
  return (
    doRender ?
    <div 
      className={`${styles.ad}`}
      style={{
        background: 'url("/images/banners/Top-Banner.gif")'
      }}
    >
      {/* <img src="/images/banners/Top-Banner.gif" alt="" /> */}
    </div>
    : <></>
  )
}

TopHeaderAd.propTypes = {}

export default TopHeaderAd


/* 
<div className={`${styles.inner} contain`}>

        
        <section className={`${styles.box_2}`}>
          <span>تماس با ما:</span>
          <span dir='ltr'>
            0990-5995768
          </span>
        </section>

        <section className={`${styles.box_m}`}>
          <p>
            ارسال به تمام نقاط تهران و کرج
          </p>
        </section>

        <section className={`${styles.box_1}`}>
          <IconButton>
            <RiInstagramFill className={`${styles.ico}`}/>
          </IconButton>
          <IconButton>
          <RiWhatsappFill className={`${styles.ico}`}/>
          </IconButton>
          <IconButton>
          <BsTelegram className={`${styles.ico}`}/>
          </IconButton>
        </section>

      </div>
*/
