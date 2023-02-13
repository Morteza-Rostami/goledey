import React, { useMemo } from 'react'
import { useState, useEffect } from 'react';

import OrderTab from '../../Dashboard/OrderTab/OrderTab';
//css 
import styles from './StatusTabs.module.scss';

// icons
import OngoingIco from '../../../../SVG/profileSVG/OngoingIco';
import CancelIco from '../../../../SVG/profileSVG/CancelIco';
import DeliveredIco from '../../../../SVG/profileSVG/DeliveredIco';
import UnpaidIco from '../../../../SVG/profileSVG/UnpaidIco';
import HorizLine from '../../../../COMPONENTS/HorizLine/HorizLine';
import { Link, useParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { MdClose, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OrderCard from '../OrderCard/OrderCard';
import { fetchOrdersByUser, resetOrders } from '../../../../ACTIONS/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import LazyLoad from '../../../../COMPONENTS/LazyLoad/LazyLoad';
import CONST from '../../../../CONSTANTS/CONST';


/* tab panel component */
const TabPanel  = (props) => {
  const { 
    children, 
    value, 
    index, 
    orders,
    dispatchData,
    ...other } = props;

  const nextPage = useSelector(state => state.orderStore?.pagObj?.next?.page);
  const isLoading = useSelector(state => state.orderStore?.isLoading);

  // make card
  function makeCard(key, data) {
    return (
      <OrderCard
        key={key}
        order={data}
      />
    )
  }
  
  return (
    <div
      className={`${styles.tabpanel}`}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      
      {value === index && (
        orders &&
        <LazyLoad
          dataArr={orders}
          css={styles}
          nextPage={nextPage}
          isLoading={isLoading}
          makeCard={makeCard}
          loadMoreText={'سفارشهای بیشتر'}
          action={fetchOrdersByUser}
          dispatchData={dispatchData}
        />

        
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

/* component */

const StatusTabs = ({
  cssName,
}) => {
  // current tab value
  const [value, setValue] = React.useState(0);
  //const authUser = useSelector(state => state.userStore.user._id);
  const { userId: authUser } = useParams();
  
  const orders = useSelector(state => state.orderStore.orders);
  const counts = useSelector(state => state.userStore.user.ordersCount);
  const statuses = ['ONGOING', 'DELIVERED', 'UNPAID', 'CANCELED'];
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(resetOrders())
    dispatch(fetchOrdersByUser(authUser, statuses[newValue], CONST.PAGE, CONST.ordersLim))
  };

  // load default tab in first render
  useEffect(() => {
    if (authUser) {
      dispatch(resetOrders())
      dispatch(fetchOrdersByUser(authUser, statuses[value], CONST.PAGE, CONST.ordersLim))
    }
  }, [authUser]);

  const tabs = useMemo(() => {
    return  [
      {
        id: 1, 
        icon: <OngoingIco/>,
        status: 'جاری',
        count: counts?.ongoingCount || 0,
        activeTab: false  
      }, 
      {
        id: 2, 
        icon: <DeliveredIco/>,
        status: 'تحویل شده',
        count: counts?.deliveredCount || 0,
        activeTab: false  
      },
      {
        id: 3, 
        icon: <UnpaidIco/>,
        status: 'پرداخت ناموفق',
        count: counts?.unpaidCount || 0,
        activeTab: false  
      },
      {
        id: 4, 
        icon: <CancelIco/>,
        status: 'مرجوع شده',
        count: counts?.canceledCount || 0,
        activeTab: false  
      },
    ] 
  }, [counts]);

  return (
    <section
    className={`${styles.status__tabs} ${cssName} status-tabs`}
  >
    <section
      className={`${styles.topsec}`}
    >
      <div
        className={`${styles.head}`}
      >
        <h5>
        سفارشات
        </h5>
        <IconButton 
          component={Link}
          to={`/users/dashboard/${authUser}`}
        >
          <MdClose/>
        </IconButton>
      </div>

      <HorizLine/>

      <div
        className={`${styles.inwrap}`}
      >
        <div
          className={`${styles.tabs}`}
        >
          <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          sx={{
            width: '100%',
            justifyContent: 'space-between'
          }}
          >

            {
              tabs &&
              tabs.map((tab, i) => (
                <Tab 
                  key={i}
                  label={
                    <OrderTab 
                    id={tab.id}
                    icon={tab.icon}
                    status={tab.status}
                    count={tab.count}
                    activeTab={tab.activeTab}
                    />
                  }
                />
              )) 
            }
          
          </Tabs>
        </div> {/* tabs */}
      </div> {/* inwrap */}
      </section> {/* topsec */}

      <div
        className={`${styles.list}`}
      >
        {
          [...Array(4).keys()].map((vl, i) => (
            <TabPanel 
              orders={orders}
              value={value} 
              index={i} 
              key={i}
              dispatchData={{user: authUser, status: statuses[value]}}
              
              />
          ))
        }
      </div>
  </section> /* StatusTabs */
  )
}

export default StatusTabs