import React, { useMemo } from 'react'

// css
import styles from './InfoCard.module.scss';
import AvatarIco from '../../SVG/profileSVG/AvatarIco';
import PhoneIco from '../../SVG/profileSVG/PhoneIco';
import LocIco from '../../SVG/profileSVG/LocIco';

import {Link} from 'react-router-dom'

const InfoCard = () => {
  const auth = JSON.parse(localStorage.getItem('auth'))?.user;

  const settingLink = `/users/settings/${auth && auth._id}`;
  const addressLink = `/users/address/${auth && auth._id}`;
  

  const nameMissing = 'لطفا نام خود را وارد کنید.';
  const cityMissing = 'لطفا شهر خود را انتخاب کنید.'

  const makeMissTxt = (txt, link) => (
    <p className={`${styles.error}`}>
      <span>
        {txt}        
      </span>
      <Link to={link}>تنظیمات</Link>
    </p>
  )
  

  const infos = useMemo(() => {
    return [
      { 
        icon: <AvatarIco/>, 
        text: auth && auth.name ? auth.name : makeMissTxt(nameMissing, settingLink) },
      { 
        icon: <PhoneIco/>, 
        text: auth && auth.cellPhone },
      { 
        icon: <LocIco/>, 
        text: 
        (auth && auth?.address?.city?.name) 
        ? 'ارسال کالا به ، ' + auth.address.city.name 
        : makeMissTxt(cityMissing, addressLink) 
      },
    ]
  });

  // if: there is no auth
  if (!auth) {
    return <></>
  }

  return (
    <div 
      className={`${styles.info__card}`}
    >
      <div
        className={`${styles.design}`}
      >
        <div
          className={`${styles.box}`}
        >
          <span className={`${styles.dot}`}></span>
        </div>
        <div
          className={`${styles.box}`}
        >
          <span className={`${styles.dot}`}></span>
        </div>
        <div
          className={`${styles.box}`}
        >
          <span className={`${styles.dot}`}></span>
        </div>
        <div className={`${styles.line}`}></div>
      </div>
      <div
        className={`${styles.info}`}
      >
        {
          infos.length
          ? (
            infos.map((info, i) => (
              <div
                key={i}
                className={`${styles.item}`}
              >
                {info.icon}
                <span>
                  {info.text}
                </span>
              </div>
            ))
          ) : ''

        }
      </div>
    </div>
  )
}

export default InfoCard