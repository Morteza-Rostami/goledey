import { Button, IconButton } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material ui
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import TextareaAutosize from '@mui/base/TextareaAutosize';

import { createCardMsg } from '../../ACTIONS/msgActions';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// css
import styles from './CardMsg.module.scss';
import { Box } from '@mui/system';
import { MdClose, MdMailOutline } from 'react-icons/md';
import { useSnackbar } from 'notistack';
import CONST from '../../CONSTANTS/CONST';
import { addToast } from '../../ACTIONS/toastActions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const CardMsg = ({ openDialog, addItem, itemSlug }) => {
  const [cardMsg, setCardMsg] = useState('');
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  // responsive dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const snackObj = useSnackbar();


  // product:
  const hasCardMsg = 
    useSelector(state => state.productsStore.product?.hasCardMsg);

  // create cardMsg
  function makeMsgOnClick() {
    const msgLim = 10;
    // if: there is a card message -> send button works
    // check if string is not all white spaces => 
    if (!cardMsg || cardMsg.length <= msgLim || !cardMsg.replace(/\s/g, '').length) {
      dispatch(addToast(snackObj, CONST.ERROR_SNACK, `متن شما باید بیشتر از (${msgLim}) کاراکتر باشد.`));
      return;
    }

    dispatch(createCardMsg(cardMsg));

    // store cart message in local storage:
    localStorage.setItem(CONST.CARD_MSG, cardMsg);

    handleClose();

    // add item to card
    if (addItem)
      addItem(itemSlug);
    
    setCardMsg('');
  }

  function cancelCardMsg() {
    handleClose();
    // if: card mssage canceled => add to card anyways
    if (addItem) {
      addItem(itemSlug);
    }

    setCardMsg('');
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // parent can call child.func to open dialog
  useEffect(() => {
    if (openDialog) 
      openDialog.current = handleClickOpen;
  }, []);


  return (
    <div>
      {/* {
        hasCardMsg  
        ? (
          <Button
          color={'secondary'}
            onClick={handleClickOpen}
          >
            add card msg
          </Button>
        ) : ''
      } */}

      <Dialog
        className={`${styles.card__msg}`}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen={fullScreen}
      >
        <DialogTitle
          component={'div'}
          className={`${styles.header}`}
        >
          <div
            className={`${styles.close}`}
          >
            <IconButton
              onClick={() => handleClose()}
            >
              <MdClose className={`${styles.ico}`}/>
            </IconButton>
          </div>
          <div
            className={`${styles.heading}`}
          >
            <div
              className={`${styles.top}`}
            >
              <MdMailOutline className={`${styles.ico}`}/>
              <p className={`${styles.txt}`}>
                کارت پستال
              </p>
            </div>
            <p
              className={`${styles.title}`}
            >
              روی کارت پستالتون چی بنویسیم خوبه؟!
            </p>
          </div>
        </DialogTitle>
        <DialogContent
          className={`${styles.content}`}
        >
          <TextareaAutosize
            className={`${styles.area}`}
            aria-label="empty textarea"
            placeholder="تولدت مبارک مهسای عزیز..."
            minRows={10}
            value={cardMsg}
            onChange={(e) => setCardMsg(e.target.value)}
          />
        </DialogContent>
        <DialogActions
          className={`${styles.actions}`}
        >
          <Button 
            className={`${styles.cancel}`}
            onClick={cancelCardMsg}>
            نمیخوام / <span>(افزودن به سبد)</span>
          </Button>
          <Button 
          className={`${styles.send}`}
          onClick={makeMsgOnClick}>
            ارسال
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default CardMsg