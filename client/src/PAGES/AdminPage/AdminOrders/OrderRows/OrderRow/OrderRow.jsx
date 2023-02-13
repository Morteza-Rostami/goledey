import React, { useRef, useState } from 'react'
import { Button } from 'rsuite'
import OrdersModal from '../../OrdersModal/OrdersModal';
import OrderMsgModal from '../../OrderMsgModal/OrderMsgModal';
import SelectStat from './SelectStat/SelectStat';
import FrontHelp from '../../../../../HELPERS/frontHelp';
import { useDispatch } from 'react-redux';
import UserInfo from '../../UserInfo/UserInfo';
import { makeAdminOrderMsg } from '../../../../../ACTIONS/adminActions';

const OrderRow = ({
  row,
  products,
  adminMsg,
}) => {

  // select status state 
  const [newStatus, setNewStatus] = useState('');
  // adminMsg state
  const [adminMessage, setAdminMessage] = useState('');

  // function: open products modal
  const openOrderMsg = useRef(null);

  const openProducts = useRef(null);
  const openUserInfo = useRef(null);


  const dispatch = useDispatch();

  // submit: status and admin message
  const submitOrderInfo = () => {
    const data = {
      orderId: row._id,
      status: newStatus,
      adminMsg: adminMessage,
    }

    console.log(data);
    // request
    if (newStatus || adminMessage) {
      dispatch(makeAdminOrderMsg(data));

      setNewStatus('')
      setAdminMessage('');
    }
  }

  console.log(adminMessage)

  return (
    <>
    <tr >
      {
        row.map((cell, j) => {

          if (cell.head == 'total') {
            return (
              <td key={j}> 
                { FrontHelp.formatMoney(cell.data) }
              </td>
            )
          }

          if (cell.head == 'status select') {
            return (
              <td key={j}> 
                <SelectStat newStatus={newStatus} setNewStatus={setNewStatus}/>
              </td>
            )
          }
          
          if (cell.head === 'products') {
            return  (
              <td key={j}> 
                <Button
                  onClick={() => openProducts.current()}
                >
                  محصولات
                </Button>
              </td>
            )
          }

          if (cell.head  === 'actions') {
            return (
              <td key={j}> 
                <Button
                  onClick={() => openOrderMsg.current()}
                  style={{
                    marginLeft: '1rem'
                  }}
                >
                  پیام
                </Button>
                <Button
                  onClick={() => openUserInfo.current()}
                  style={{
                    marginLeft: '1rem'
                  }}
                >
                  مشتری
                </Button>
                <Button
                  onClick={submitOrderInfo}
                >
                  ارسال
                </Button>
              </td>
            )
          }

          if (cell.head !== 'status select')
          return (
            <td key={j}> 
              {cell.data}
            </td>
          )

          
          
        })
      }
    </tr>
    {/* products model */}
    <OrdersModal
    openProducts={openProducts}
    products={products}
    />
    {/* order msg model */}
    <OrderMsgModal
    openOrderMsg={openOrderMsg}
    adminMsg={adminMsg}
    adminMessage={adminMessage}
    setAdminMessage={setAdminMessage}
    />

    <UserInfo
      openUserInfo={openUserInfo}
      user={row.user}
    />
    </>
  )
}

export default OrderRow