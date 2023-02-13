import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';

import FrontHelp from '../../../../HELPERS/frontHelp';

// css
import styles from './OrdersModal.module.scss';

const OrdersModal = ({
  openProducts,
  products,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const heads = useMemo(() => {
    return [ 'نام محصول', 'تعداد', 'جمع کل', 'قیمت', 'کارت پستال' ];
  }, []);

  useEffect(() => {
    openProducts.current = handleOpen;
  }, []);

  return (
    <>
      {/* <ButtonToolbar>
        <Button onClick={handleOpen}> Open</Button>
      </ButtonToolbar> */}

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            لیست محصولات
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`${styles.content}`}
        >
          {
            <table className={`${styles.table}`}>
            <tr>
              {
                heads.length
                ? (
                  heads.map((vl, i) => (
                    <th key={i}>
                      {vl}
                    </th>
                  ))
                ) : ''
              }
            </tr>

            {
              products.length
              ? (
                products.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {item.product.name}
                      </td>
                      <td>
                        {item.amount}
                      </td>
                      <td>
                        { FrontHelp.formatMoney(item.total) }
                      </td>
                      <td>
                        { FrontHelp.formatMoney(item.product.price) }
                      </td>
                      <td>
                        { item.cardMsg }
                      </td>
                    </tr>
                  )
                })
              ) : ''
            }

            
            </table>
            
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            کنسل
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrdersModal