import React from "react";
import { useState, useEffect} from 'react';
// css 
import styles from './ReviewCrud.module.scss';

// redux
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// material ui
import { Button, CircularProgress } from "@mui/material";
import { MdChatBubbleOutline, MdClose, MdSettingsInputComponent } from 'react-icons/md';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Select } from "@mui/material";

// material ui form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// text area
import { TextareaAutosize } from '@mui/base';
import StarRate from "./StarRate/StartRate";

//redux
import { useDispatch } from "react-redux";
// action
import { createReview } from "../../../../ACTIONS/reviewActions";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import COLOR from "../../../../COLORS/COLORS";
import { useSnackbar } from "notistack";
import CONST from "../../../../CONSTANTS/CONST";

// form animation:
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// component
const ReviewCrud = ({ 
  product,
  classn 
}) => {
  const [open, setOpen] = useState(false);
  // start rating => (lifted state)
  const [rate, setRate] = useState(2);
  // review content
  const [review, setReview] = useState('');
  const dispatch = useDispatch();
  // create review loading
  const isLoading = useSelector(state => state.reviewsStore.isLoading);
  // snack bar
  const snackObj = useSnackbar();

  const token = JSON.parse(localStorage.getItem(CONST.AUTH))?.token;

  /* dialog responsive */
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // modal open / close
  function handleOpen() {

    // if auth: open review 
    if (token) {
      setOpen(true);
    } else {
      // else: redirect to signup
      
    }


  }
  function handleClose() {setOpen(false)}

  // set value of rating
  function setRatingNum(val) { setRate(val) };

  // post review to the server
  function postReview() {
    // make review object
    const userReview = {
      content: review,
      rating: rate,
      //user: authUser
      productId: product._id
    };
    // dispatch action -> data to server
    dispatch(createReview(userReview, snackObj));
    // clear: rate and review
    setReview('');
    setRate(2);
    // close the modal
    setOpen(false);

    // show success or falier message

  }

  return (
    <div
      className={`${styles.filter} ${classn}`}
    >
      <StarRate
        value={rate}
        setValue={setRatingNum}
        handOpen={handleOpen}
      />
     

      {/* modal */}
      <Dialog
        className={`${styles.rev__makr} review-crud-dialog`}
        //fullWidth={true}
        fullScreen={fullScreen}
        //maxWidth={'sm'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* check if products are loaded before using filters on them */}
        <DialogTitle
          className={`${styles.header}`}
        >
          <IconButton
            className={`${styles.close}`}
            onClick={handleClose}
          >
            <MdClose 
              className={`${styles.ico}`}
            />  
          </IconButton>

          <div
            className={`${styles.title}`}
          >
            <div
              className={`${styles.top}`}
            >
              <MdChatBubbleOutline
                className={`${styles.ico}`}
              />
              <p
                className={`${styles.txt}`}
              >
                نظر شما
              </p>
            </div>
            <p
              className={`${styles.subtxt}`}
            >
              آیا از این محصول رضایت داشته اید؟!
            </p>
          </div>

        </DialogTitle>
        <DialogContent
          className={`${styles.content}`}
        >
          {/* <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText> */}
       
         
          <TextareaAutosize
            className={`${styles.area}`}
            aria-label="minimum height"
            minRows={10 }
            placeholder="نظر خود را با ما به اشتراک بگذارید..."
            value={review}
            onChange={(e) => setReview(e.target.value) }
          />
          
          

        </DialogContent>
        <DialogActions
          className={`${styles.actions}`}
        >
          <Button
            className={`${styles.send}`}
            variant="contained"
            color="success"
            onClick={postReview}

            /* load */
            startIcon={ isLoading ? <CircularProgress sx={{color: COLOR.offWhite}} size={18}/> : <></>}
            disabled={ isLoading ? true : false }
          >
            تایید
          </Button>
          <Button 
            className={`${styles.cancel}`}
            variant="contained"
            onClick={handleClose}>
            لغو
          </Button>
        </DialogActions>

      </Dialog>

    </div>
  )
}

export default ReviewCrud;