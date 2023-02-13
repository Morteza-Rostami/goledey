import React from 'react'
import { useState, useEffect } from 'react';

// css
import styles from './Address.module.scss';
import LayoutA from '../../../LAYOUTS/LayoutA/LayoutA';

import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../Dashboard/NavBar/NavBar';
import UserGrid from '../UserGrid/UserGrid';
import LocForm from './LocForm/LocForm';
import AutoLayout from '../../../LAYOUTS/AutoLayout/AutoLayout';
import Header from '../../../LAYOUTS/Header/Header';
import HeaderProfile from '../../../LAYOUTS/HeaderProfile/HeaderProfile';
import MobNav from  '../../../LAYOUTS/MobNav/MobNav'
import Footer from '../../../LAYOUTS/Footer/Footer';
import { useParams } from 'react-router-dom';

const Address = () => {
  const { userId: authUser } = useParams();
  

  return (
    <AutoLayout
      headerMob={<HeaderProfile title={'آدرسها'} link={`/users/dashboard/${authUser}`}/>}
      headerDec={<Header/>}
      footerMob={<MobNav/>}
      footerDec={<Footer/>}
    >
      <div className={`${styles.address}`}>

        <UserGrid 
          navDisable={true}
        >
          <div style={{width: '100%'}}>
            <NavBar/>
          </div>
          <section style={{width: '100%'}}>
            <div
              className={`${styles.head}`}
            >
              <h4>
                آدرسها
              </h4>
            </div>
            <LocForm/>
          </section>
        </UserGrid>

      </div>

    </AutoLayout>
  )
}

export default Address