import React from 'react'

//css
import styles from './SecHeader.module.scss';

import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SecHeader = ({ link, name, color }) => {
  return (
    <div
      className={`${styles.secheader}`}
    >
      
      <div className={`${styles.box_2}`}>
        <h2 style={{ borderBottom: `.1rem solid ${color}` }}>
        {name}
        </h2>
      </div>
      <div 
        className={`${styles.box_1}`}
      >
        <Link
          to={link}
          style={{ color: color }}
        >
          مشاهده <MdOutlineKeyboardArrowLeft/>    
        </Link>
      </div>
    </div> /* secheader */
  )
}

export default SecHeader