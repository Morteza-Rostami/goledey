import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// redux
import { useDispatch, useSelector } from 'react-redux';
// action
// import { incrementAmount, decrementAmount } from '../../ACTIONS/cartActions';
import { decItem, decItemLS, incItem, incItemLS, removeFromCart, removeItem, removeItemLS } from '../../ACTIONS/cartActions';

// material ui
import DeleteIcon from '@mui/icons-material/Delete';

// css 
import styles from './Amount.module.scss';

import BinIco from '../../SVG/cartSVG/BinIco';
import MinusIco from '../../SVG/cartSVG/MinusIco';
import PlusIco from '../../SVG/cartSVG/PlusIco';
import CONST from '../../CONSTANTS/CONST';
import { CircularProgress, Skeleton } from '@mui/material';
import { useState } from 'react';


const Amount = ({ itemSlug, switchIsInCart }) =>  {
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;

  //const cartDoneLoading = useSelector(state => state.cartStore.doneLoading); 
  const [amountLoading, setAmountLoading] = useState(false);

  const count = useSelector(state => {
    const item = state.cartStore.products.find(item => item?.product?.slug === itemSlug);
    return item?.amount;
  }) || 1;
  // const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);
  const dispatch = useDispatch();

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  function incrementItem() {
    //dispatch(incrementAmount(itemSlug))
    const data = {
      userId: user ? user._id : '',
      itemSlug: itemSlug,
      setAmountLoading: setAmountLoading,
    }

    if (user) {
      dispatch(incItem(data))
    } else {
      dispatch(incItemLS(data))
    }
  }
  function decrementItem() {
    if (count === 1) return;
    //dispatch(decrementAmount(itemSlug))
    const data = {
      userId: user ? user._id : '',
      itemSlug: itemSlug,
      setAmountLoading: setAmountLoading,

    }
    
    if (user) {
      dispatch(decItem(data))
    } else {
      dispatch(decItemLS(data))
    }
  }

  function deleteItem(slug) {
    if (itemSlug) {
      //dispatch(removeFromCart(slug));
      // switchIsInCart();
      const data = {
        userId: user ? user._id : '',
        itemSlug: itemSlug,
        setAmountLoading: setAmountLoading,
      }


      if (user) {
        dispatch(removeItem(data));
      } else {
        dispatch(removeItemLS(data))
      }

    }
  }

  return (
    <div
      className={`${styles.amount}`}
    >
      {
        amountLoading
        ? (
          <Skeleton variant="rectangular" width={100} height={44} />
        ) : (

          <ButtonGroup
            className={`${styles.btn__group}`}
          >
            
            <Button
              aria-label="increase"
              variant="text" 

              onClick={() => {
                incrementItem();
              }}
            >
              {/* <AddIcon fontSize="small" /> */}
              <PlusIco/>
            </Button>
            <Button
              aria-label="reduce"
              variant="text" 
              onClick={() => {
                decrementItem();
              }}
            >
              {/* <RemoveIcon fontSize="small" /> */}
              <MinusIco/>
            </Button>
            <p className={`${styles.count}`}>{count}</p>
            <Button 
              variant="text" 
              // startIcon={}
              onClick={() => deleteItem(itemSlug)}
            >
              <BinIco/>
            </Button>
          </ButtonGroup>
        )
      }
        

      
      
    </div>
  );
}

// default props
Amount.defaultProps = {
  // default function:
  switchIsInCart: () => {},
}

export default Amount;


/* 
 sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'row',
        // '& > *': {
        //   marginBottom: 2,
        // },
        // '& .MuiBadge-root': {
        //   marginRight: 4,
        // },
      }}

*/