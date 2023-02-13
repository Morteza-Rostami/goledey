import React, { useState } from 'react'

// css
import styles from './StatTab.module.scss';
import { Button } from '@mui/material';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetOrders } from '../../../../../ACTIONS/orderActions';

const StatTab = ({
  id,
  icon,
  status,
  count,
  activeTab,
  enStatus,
}) => {

  const [sStatus, setSStatus] = useState(enStatus);
  const navigate = useNavigate();
  const { userId } = useParams();

  const dispatch = useDispatch();

  const handStatClick = () => {

    // clear state.orders
    dispatch(resetOrders());
    navigate(`/users/orders/${userId}/${enStatus}`);


    
  };

  return (
    <Button
      //component={Link}
      className={`${styles.tab}`}
      onClick={handStatClick}
      //to={`/users/orders/${userId}/${enStatus}`}
    >
      {icon}
      <p
        className={`${styles.status}`}
      >
      {status}
      </p>

      <p
        className={`${styles.count}`}
      >
        {count}
      </p>
    </Button>
  )
}

export default StatTab