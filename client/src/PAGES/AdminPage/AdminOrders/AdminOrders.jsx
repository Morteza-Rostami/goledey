import React, { useMemo, useRef } from 'react'

// css
import styles from './AdminOrders.module.scss';
import Inner from '../../../COMPONENTS/Inner/Inner'
import AutoLayout from '../../../LAYOUTS/AutoLayout/AutoLayout';
import Header from '../../../LAYOUTS/Header/Header';
import MobNav from '../../../LAYOUTS/MobNav/MobNav';
import Footer from '../../../LAYOUTS/Footer/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetOrders } from '../../../ACTIONS/adminActions';
import CONST from '../../../CONSTANTS/CONST';
import OrdersModal from './OrdersModal/OrdersModal';
import OrderMsgModal from './OrderMsgModal/OrderMsgModal';
import { Button } from 'rsuite';
import OrderRows from './OrderRows/OrderRows';

const statuses = {
  [CONST.ONGOING]: 'جاری',
  [CONST.DELIVERED]: 'تحویل شده',
  [CONST.CANCELED]: 'مرجوع شده',
  [CONST.UNPAID]: 'پرداخت ناموفق',
}

const AdminOrders = () => {
  const orders = useSelector(state => state.adminStore.orders);
  const fetchOnce = useRef(true);
  const numOfHeads = 8;

  const heads = useMemo(() => {
    return [ 'کد سفارش', 'نام مشتری', 'تاریخ تحویل', 'مجموع قیمت', 'وضعیت', 'تغییر وضعیت', 'خریدها', 'عملیاتها'];
  }, []);

  const dispatch = useDispatch();
  

  const tableData = useMemo(() => {
    // table: [ row: [cell, cell], row: [] ]
    const table = [];

    if (orders?.length) {

      orders.forEach((order, i) => {
  
        const orderRow = [
          {
            head: 'orderNum',
            data: order.number,
          },
          {
            head: 'uesrname',
            data: order.user.name
          }, 
          {
            head: 'delivery date',
            data: order.deliverDate
          },
          {
            head: 'total',
            data: order.total,
          },
          {
            head: 'status',
            data: statuses[order.status]
          },
          {
            head: 'status select',
            data: statuses,
          },
          {
            head: 'products',
            data: '',
          },
          {
            head: 'actions',
            data: ''
          }
        ];
        table.push(orderRow);
      })
  
      // array are objects => put products of each row or order
      orders.forEach((order, i) => {
        table[i].products = order.products;  
  
        console.log(order?.adminMsg)
  
        table[i].adminMsg = order.adminMsg;
        table[i]._id = order._id;
        table[i].user = order.user;
      });
  
      return table;
    } else {
      return [];
    }
  }, [orders]);

  useEffect(() => {
    if (fetchOnce.current) {

      console.log('lover')
      // get orders
      dispatch(adminGetOrders());


      fetchOnce.current = false;

    }
  }, []);


  return (
    <AutoLayout
      headerMob={''}
      headerDec={<Header/>}
      footerMob={<MobNav/>}
      footerDec={<Footer/>}
    >
      <div
        className={`${styles.admin__orders} center-contain`}
      >
        <Inner
          css={styles.inner + ' contain'}
        >

          <table className={`${styles.table}`}>
            <tr>
              {
                heads.length
                ? (
                  heads.map((item, i) => <th key={i}>{item}</th>)
                ) : ''
              }
            </tr>
            
            <OrderRows
              tableData={tableData}
            />
              
          </table>

          

          
        </Inner>
        
      </div>

    </AutoLayout>
  )
}

export default AdminOrders