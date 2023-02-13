import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RouteAuth = () => {
  const auth = useSelector(state => state.userStore);
  if (!auth?.token) 
    return <Navigate to={'/'}/>
}

export default RouteAuth;