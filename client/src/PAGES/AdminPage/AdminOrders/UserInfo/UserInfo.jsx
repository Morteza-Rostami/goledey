import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';

import FrontHelp from '../../../../HELPERS/frontHelp';

// css
import styles from './UserInfo.module.scss';

const UserInfo = ({
  openUserInfo,
  user,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const heads = useMemo(() => {
    return [ 'نام مشتری', 'موبایل', 'شهر', 'تلفن منزل', 'آدرس' ];
  }, []);

  useEffect(() => {
    openUserInfo.current = handleOpen;
  }, []);

  return (
    <>
      {/* <ButtonToolbar>
        <Button onClick={handleOpen}> Open</Button>
      </ButtonToolbar> */}

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            اطلاعات مشتری
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
              Object.keys(user).length
              ? (
                  <tr>
                    <td>
                      {user.name}
                    </td>
                    <td>
                      {user.cellPhone}
                    </td>
                    <td>
                      { user?.address?.city?.name ? user.address.city.name : '' }
                    </td>
                    <td>
                      { user?.address?.phone ? user.address.phone : '' }
                    </td>
                    <td>
                      { user?.address?.fullAddress }
                    </td>
                  </tr>
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

export default UserInfo