import React from "react";
import { useState, useEffect, useRef } from 'react';
import { Button, CircularProgress } from "@mui/material";
import Amount from "../Amount/Amount";
import PropTypes from 'prop-types';


// redux
import { useDispatch, useSelector } from 'react-redux';

// action
import { addToCart, addToCartLS, isItemInCart, isItemInLS } from "../../ACTIONS/cartActions";
// import { hasProduct } from '../../ACTIONS/cartActions';

// material ui
import Skeleton from "@mui/material/Skeleton";
import CardMsg from "../CardMsg/CardMsg";


//css
import styles from './AddToCart.module.scss';
import { useSnackbar } from "notistack";
import CONST from "../../CONSTANTS/CONST";

const AddToCart = ({
  itemSlug,
  product,
  css,
}) => {
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;
  const isCartLoading = useSelector(state => state.cartStore.isCartLoading);
  const isInCart = useSelector(state => state.cartStore.isInCart);
  const cartItems = useSelector(state => state.cartStore.products) || [];
  // show loading until button: addToCart or amount.
  const [loadBtn, setLoadBtn] = useState(false);
  // const [isInCart, setIsInCart] = useState(false);
  //const cardMsg = useSelector(state => state.msgStore?.cardMsg);

  // don't show any button untill we check => item is in cart.db or not
  const [addCartReqDone, setAddCartReqDone] = useState(false);

  // ref for calling child method
  const openCardMsgDialog = useRef(null);

  const dispatch = useDispatch();
  const snackObj = useSnackbar();


  function addItem() {
    // dispatch: addItem
    // Object.keys(product).length
    const cardMsg = localStorage.getItem(CONST.CARD_MSG) || '';

    if (itemSlug) {

      console.log('______________________________-', cardMsg)
      const data = {
        userId: user ? user._id : '',
        itemSlug: itemSlug,
        cardMsg: cardMsg,
      }

      if (user) {
        dispatch(addToCart(data));
      } else {
        dispatch(addToCartLS(data))
      }
      // setIsInCart(current => !current);
      //switchIsInCart();
    }
  }

  function ifCardMsgThenAddItem() {
    const cardMsg = localStorage.getItem(CONST.CARD_MSG) || '';

    if (cardMsg) {
      addItem(itemSlug);
    } else {
      // no cardMsg
      // onClick={() => childFunc.current()}

      // open cardMsg dialog
      //console.log(openCardMsgDialog.current);
      console.log('open cartmsg')
      openCardMsgDialog.current();
    }
  }

  // switch isInCart
  // function switchIsInCart() {setIsInCart(current => !current);}

  // run: on first render, when itemSlug is avaliable, if: cart.products is updated.
  //[itemSlug, cartItems]
  useEffect(() => {
    const data = {
      userId: user ? user._id : '',
      itemSlug: itemSlug,
      setAddCartReqDone: setAddCartReqDone,
    }
    if (user) {
      dispatch(isItemInCart(data))
    } else {
      dispatch(isItemInLS(data));
    }
  }, [itemSlug]);

  /* if: null do not show any of the buttons => redux is not set yet */
  if (!addCartReqDone) {
    return (
      <>
        <Skeleton variant="rectangular" width={100} height={44} />
      </>
    )
  } 

  return (
    <>
      {
          
      !isCartLoading
      ? (
        isInCart
        ? (
          <Amount 
            itemSlug={itemSlug}
            css={css}
            //switchIsInCart={switchIsInCart}
            // handleDelete={() => deleteItem(itemSlug)}
          />
        )
        : (
          <Button
            className={`${styles.add__btn} ${css}`}
            variant="outlined"
            color='primary'
            onClick={() => ifCardMsgThenAddItem()}
          >
            افزودن به سبد
          </Button>
        )

      ) : (
        <Skeleton 
        className={`${css}`}
        variant="rectangular" 
        width={100} 
        height={44} 
        
        />
        
      )

      }


      {/* add cardMsg */}
      <CardMsg 
      openDialog={openCardMsgDialog}
      addItem={addItem}
      itemSlug={itemSlug}
      />
    </>
  )
}

// props defaul value
AddToCart.defaultProps = {
  itemSlug: '',
  product: {}
}

export default AddToCart

/* 
<Button
        className={`${styles.load__btn}`}
        size='large'
        style={{
          padding: '1rem 4rem'
        }}
        disabled
        >
          <CircularProgress 
            className={`${styles.spinner}`}
            size={15}
          />
        </Button> 

*/
