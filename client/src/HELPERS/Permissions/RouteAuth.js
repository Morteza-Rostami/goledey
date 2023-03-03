import React from 'react';
//import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CONST from '../../CONSTANTS/CONST';

const RouteAuth = () => {
  //const auth = useSelector(state => state.userStore);
  const auth = JSON.parse(localStorage.getItem(CONST.AUTH));
  let notAuth = false;
  if (!auth?.token) {
    notAuth = true;
    console.log(auth, 'block guest');
    //return <Navigate to={'/'} replace/>
    //navigate('/');
    window.location.replace('/');
    return notAuth;
  }
}

export default RouteAuth;