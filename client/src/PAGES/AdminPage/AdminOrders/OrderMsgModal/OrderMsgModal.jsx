import React from 'react';
import { useState, useEffect } from 'react';

import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';

const OrderMsgModal = ({
  openOrderMsg,
  adminMsg,
  adminMessage,
  setAdminMessage,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    openOrderMsg.current = handleOpen;
  }, []);


  return (
    <>
      {/* <ButtonToolbar>
        <Button onClick={handleOpen}> Open</Button>
      </ButtonToolbar> */}

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            پیام برای مشتری
          </Modal.Title>
        </Modal.Header>
        <Modal.Body

        >
          <textarea 
            id="orderMsg" 
            name="orderMsg" 
            rows="4" 
            cols=""
            style={{
              width: '100%'
            }}

            value={adminMessage}
            onChange={(e) => setAdminMessage(e.target.value)}
          >
          </textarea>

          <p>
            {adminMsg}
          </p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderMsgModal