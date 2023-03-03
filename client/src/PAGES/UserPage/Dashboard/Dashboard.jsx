import React, { useEffect, useLayoutEffect, useRef } from 'react'

import styles from './Dashboard.module.scss';
// import OrderTab from './OrderTab/OrderTab';
import Brief from './Brief/Brief';
import NavBar from './NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addToast } from '../../../ACTIONS/toastActions';
import CONST from '../../../CONSTANTS/CONST';

import AutoLayout from '../../../LAYOUTS/AutoLayout/AutoLayout'
import HeaderDash from '../../../LAYOUTS/HeaderDash/HeaderDash';

import Header from '../../../LAYOUTS/Header/Header'
import Footer from '../../../LAYOUTS/Footer/Footer'
import MobNav from '../../../LAYOUTS/MobNav/MobNav'
import { setUserComplete } from '../../../ACTIONS/userActions';
import RouteAuth from '../../../HELPERS/Permissions/RouteAuth';
import { useNavigate } from 'react-router-dom';
import { getOrderCounts } from '../../../ACTIONS/orderActions';



const Dashboard = () => {

  const authUser = useSelector(state => state.userStore.user);
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;

  const isUserComplete = useSelector(state => state.userStore.isUserComplete);
  const snackObj = useSelector(state => state.msgStore.snackObject);
  const dispatch = useDispatch();
  // run only first render
  const runFirst = useRef(true);

  // update order counts
  useLayoutEffect(() => {
    dispatch(getOrderCounts({userId: authUser._id}));
  }, []);

  useEffect(() => {
  
    dispatch(setUserComplete());


    if (snackObj && isUserComplete) {
      if (runFirst.current) {

        dispatch(addToast(snackObj, CONST.ERROR_SNACK, `لطفا اطلاعات خود را تکمیل کنید!`));
        runFirst.current = false;
      }
    }
  }, [snackObj, authUser, isUserComplete]);

  /* useEffect(() => {
    console.log('user changed!!');
  }, [authUser]); */


  return (
    <AutoLayout
      headerMob={<HeaderDash/>}
      headerDec={<Header/>}
      footerMob={<MobNav/>}
      footerDec={<Footer/>}
    >
      <div 
        className={`${styles.dashboard} center-contain`}
      > 
        <div
          className={`${styles.inner} contain-2`}
        >

          <div 
            className={`${styles.grid}`}
          >
            <Brief cssName={styles.brief}/>

            <NavBar cssName={styles.navbar}/>
          </div>
        </div>
        
      </div>
    </AutoLayout>
  )
}

export default Dashboard

/* 



*/