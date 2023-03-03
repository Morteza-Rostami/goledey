import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { IconButton } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';

// css 
import styles from './LoginModal.module.scss';
import Register from '../Register';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeOpenRegister } from '../../../ACTIONS/msgActions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  // ref to open this modal
  const ref = useRef();
  const dispatch = useDispatch();

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    console.log('close')
    if (reason && reason == "backdropClick") 
        return;
    setOpen(false);
  };

  // store: func open thi modal in redux
  useEffect(() => {
    ref.current = handleClickOpen;
    dispatch(storeOpenRegister(ref));
  }, []);

  return (
    <div>
      {/* <IconButton
        className={`${styles.user_open}`}
        onClick={handleClickOpen}
      >
        <FaUserCircle
        className={`${styles.ico}`}
        />
      </IconButton> */}

      <Dialog
        className='register-modal'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        // fullScreen={true}
        // maxWidth={fullScreen}
      >
        <DialogContent>
          <Register closeModal={handleClose}/>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}