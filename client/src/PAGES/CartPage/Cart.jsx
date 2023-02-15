import React, { useEffect, useLayoutEffect, useState } from "react";
//css
import styles from './Cart.module.scss';

// components
import LayoutA from "../../LAYOUTS/LayoutA/LayoutA";
import Items from "./Items/Items";
import { Badge, Button } from "@mui/material";

// redux
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IfCartEmp from "../../HELPERS/Gates/IfCartEmp";
import Header from "../../LAYOUTS/Header/Header";
import Footer from "../../LAYOUTS/Footer/Footer";

import AutoLayout from '../../LAYOUTS/AutoLayout/AutoLayout';
import HeaderCart from "../../LAYOUTS/HeaderCart/HeaderCart";
import FooterCart from "../../LAYOUTS/FooterCart/FooterCart";
import SideCart from "./SideCart/SideCart";
import EmptCart from "./EmptCart/EmptCart";
import CONST from "../../CONSTANTS/CONST";
import { getCartDb } from "../../ACTIONS/cartActions";
import { setScreenLoading } from "../../ACTIONS/msgActions";

const Cart = () => {
  const cartLocal = JSON.parse(localStorage.getItem(CONST.CART));
  const auth = JSON.parse(localStorage.getItem(CONST.AUTH));
  const cart = useSelector(state => state?.cartStore); 
  //const auth = useSelector(state => state?.userStore);
  const screenLoading = useSelector(state => state.msgStore.screenLoading);

  // product count
  const itemsCount = useSelector(state => state.cartStore.itemsCount);

  const dispatch = useDispatch();

  const [requestDone, setRequestDone] = useState(false);


  // run code before render
  /* useLayoutEffect(() => {
    dispatch(setScreenLoading(false));

  }, []); */

  // run on first render
  useEffect(() => {
    // update user  cart:
    if (auth?.token) {
      const data = { 
        userId: auth ? auth.user._id : '',
        setRequestDone: setRequestDone, 
      }
      dispatch(getCartDb(data));
      
    } else {
      setRequestDone(true);
    }
    
  }, []);


  if (auth) {

    if (screenLoading || !requestDone) {
      return <></>
    }

    if (!screenLoading) {
      
      if (!cart.products.length) {
        
        return (
          <AutoLayout
          headerMob={<HeaderCart/>}
          headerDec={<Header/>}
          footerMob={''}
          footerDec={<Footer/>}
          >
            <EmptCart/>
          </AutoLayout>
        )
      }
    }



  } else {
    // guest
    if (!cartLocal) {
      return (
        <AutoLayout
        headerMob={<HeaderCart/>}
        headerDec={<Header/>}
        footerMob={''}
        footerDec={<Footer/>}
        >
          <EmptCart/>
        </AutoLayout>
      )
    }
  }


  return (
    <AutoLayout
      headerMob={<HeaderCart/>}
      headerDec={<Header/>}
      footerMob={<FooterCart/>}
      footerDec={<Footer/>}
    >
      <div className={`${styles.cart} center-contain`}>
        <div className={`${styles.inner} contain-2`}>
          
          <div
            className={`${styles.grid}`}
          >

            <section
              className={`${styles.main}`}
            >
              {/* header */}
              <div
                className={`${styles.head} cart-header`}
              >
                <h1
                  className={`${styles.title}`}
                >
                  سبد خرید شما
                </h1>
                <span
                  className={`${styles.badge}`}
                >
                  <Badge
                    color="secondary" 
                    badgeContent={itemsCount}>
                  </Badge>
                </span>
              </div>
              <Items 
                items={cart ? cart.products : []}
              />

              {/* <IfCartEmp>

                <div className={`${styles.info}`}>
                  
                </div>
              </IfCartEmp> */}
            </section>

            <section
              className={`${styles.sidebar}`}
            >
              <SideCart/>
            </section>
          </div>{/* grid */}

        </div>


      </div>
    </AutoLayout>
  )
}

export default Cart;