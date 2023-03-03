import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CONST from '../../CONSTANTS/CONST';
import jwtDecode from 'jwt-decode';

const RouteAdmin = () => {
  //const auth = useSelector(state => state.userStore);
  const token = JSON.parse(localStorage.getItem(CONST.AUTH))?.token;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== CONST.ADMIN) {
      return <Navigate to={'/'}/>
    }
  }
    
}

export default RouteAdmin;