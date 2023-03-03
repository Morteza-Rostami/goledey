import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import LayoutA from '../../../LAYOUTS/LayoutA/LayoutA'

import styles from './Orders.module.scss';
// import OrderTab from './OrderTab/OrderTab';
import Brief from '../Dashboard/Brief/Brief';
import NavBar from '../Dashboard/NavBar/NavBar';
import StatusTabs from './StatusTabs/StatusTabs';
import Header from '../../../LAYOUTS/Header/Header';
import Footer from '../../../LAYOUTS/Footer/Footer';
import MobNav from '../../../LAYOUTS/MobNav/MobNav';
import HeaderProfile from '../../../LAYOUTS/HeaderProfile/HeaderProfile';

import AutoLayout from '../../../LAYOUTS/AutoLayout/AutoLayout'
import CONST from '../../../CONSTANTS/CONST';
import Statuses from './Statuses/Statuses';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LazyLoad from '../../../COMPONENTS/LazyLoad/LazyLoad';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByUser, getOrderCounts, resetOrders } from '../../../ACTIONS/orderActions';
import OrderCard from './OrderCard/OrderCard';
import EmptOrder from './EmptOrder/EmptOrder';


// run once
let runOnce = true;

const Orders = () => {
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;
  // orders
  const orders = useSelector(state => state.orderStore.orders);
  const nextPage = useSelector(state => state.orderStore?.pagObj?.next?.page);
  const doneLoading = useSelector(state => state.orderStore.doneLoading);  
  const screenLoading = useSelector(state => state.msgStore.screenLoading);

  // wait until request is done
  const [requesting, setRequesting] = useState(true);

  const loc = useLocation();
  //const navigate = useNavigate();
  //const [searchParams, setSearchParams] = useSearchParams();
  const { status } = useParams();
  const dispatch = useDispatch();

  // ref value will not be overriden on component render
  const fetchOrdersOnce = useRef(true);

  const makeOrderCard = (key, data) => {
    return (
      <OrderCard
        key={key}
        order={data}
      />
    )
  }

   // update order counts
   useLayoutEffect(() => {
    dispatch(getOrderCounts({userId: user._id}));
  }, []);

  // data to dispatch with load more button
  const disData = useMemo(() => {
    // {id, status, page, limit}
    return {
      id: user._id,
      status: status,
      page: nextPage,
      limit: CONST.ordersLim,
    }
  }, [nextPage]);

  useEffect(() => {

    if (fetchOrdersOnce.current) {
      dispatch(resetOrders());
  
      const data = {
        id: user._id,
        status: status,
        page: CONST.PAGE,
        limit: CONST.reviewsLim,
        setRequesting: setRequesting,
      }
      dispatch(fetchOrdersByUser(data));

      fetchOrdersOnce.current = false;
    }
  }, [status]);

  //stop loading when store.order is set:


  return (
    <AutoLayout
      headerMob={<HeaderProfile title={'سفارشات'} link={`/users/dashboard/${user && user._id}`}/>}
      headerDec={<Header/>}
      footerMob={<MobNav/>}
      footerDec={<Footer/>}
    >
      <div 
        className={`${styles.orders} center-contain`}
      > 
        <div
          className={`${styles.inner} contain-2`}
        >

          <div 
            className={`${styles.grid}`}
          >
            <div
              className={`${styles.main}`}
            >
              {/* <StatusTabs cssName={styles.status__tabs}/> */}
              <Statuses/>

{/* 
dataArr,
  css,
  nextPage,
  isLoading,
  makeCard,
  loadMoreText,
  action,
  dispatchData
*/}           
              <div className={`${styles.orders__list}`}>
                {
                  // screenLoading = -1 or 1 or 2 ...
                  requesting
                  ? (
                    <></>
                  ) : (
                    orders && orders.length
                    ? (
                      <LazyLoad
                        dataArr={orders}
                        css={`${styles.lazy}`}
                        nextPage={nextPage}
                        isLoading={doneLoading}
                        makeCard={makeOrderCard}
                        loadMoreText={'بیشتر'}
                        action={fetchOrdersByUser}
                        dispatchData={disData}
                      />
                    ) : (<EmptOrder/>)

                  )
                }
              </div>
              
            </div>


            <div
              className={`${styles.nav}`}
            >
              <NavBar cssName={styles.navbar}/>
            </div>
          </div>
        </div>
        
      </div>
    </AutoLayout>
  )
}

export default Orders

