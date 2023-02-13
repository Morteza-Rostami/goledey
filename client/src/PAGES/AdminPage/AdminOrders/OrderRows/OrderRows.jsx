import React, { useRef } from 'react'
// import OrdersModal from '../OrdersModal/OrdersModal';
// import OrderMsgModal from '../OrderMsgModal/OrderMsgModal';
// import { Button } from 'rsuite';
import OrderRow from './OrderRow/OrderRow';

const OrderRows = ({
  tableData
}) => {

  

  return (
    <>
      {
        tableData.length
        ? (
          tableData.map((row, i) => (
            <OrderRow
              key={i}
              row={row}
              products={row.products}
              adminMsg={row.adminMsg}
            />
          ))
        ) : ''
      }
      
    </>
  )
}

export default OrderRows