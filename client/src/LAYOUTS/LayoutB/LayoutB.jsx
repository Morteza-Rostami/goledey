import React from "react";
import { useState, useEffect } from 'react'; 

/* components */
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderMob from "./HeaderMob/HeaderMob";
import FooterMobB from "./FooterMobB/FooterMobB";

import styled from "styled-components";
import COLOR from "../../COLORS/COLORS";
//css
import styles from './LayoutB.module.scss';
import CONST from "../../CONSTANTS/CONST";

const LayoutB = ({ children, itemSlug, product }) => {
  // breakpoints
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > CONST.DESKTOP);
  const [isTablet, setIsTablet] = useState(window.innerWidth > CONST.TABLET);

  // change breakpoint -> render different view.
  function updateView() {
    setIsDesktop(window.innerWidth > CONST.DESKTOP);
    setIsTablet(window.innerWidth > CONST.TABLET);
  }

  useEffect(() => {
    window.addEventListener('resize', updateView);
    // clear component -> remove eventListener
    return () => window.removeEventListener('resize', updateView);
  }, []);

  return (
    <div
      className={`${styles.layout_b}`}
    >
      {
        isTablet
          ? <Header/>
          : <HeaderMob/>
      }

      <main 
        className={`${styles.main}`}
      >
        {children}
      </main>

      {
        isTablet
        ? <Footer/>
        : <FooterMobB itemSlug={itemSlug} product={product}/>
      }

    </div>
  )
}

export default LayoutB;