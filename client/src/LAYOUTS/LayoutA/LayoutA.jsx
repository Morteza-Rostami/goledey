import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import COLOR from "../../COLORS/COLORS";
//css
import styles from './LayoutA.module.css';

const LayoutA = ({ children }) => {

  return (
    <div
      className={`${styles.layout_a}`}
    >
      <Header bgColor={COLOR.light}/>
      <main 
        className={`${styles.main}`}
      >
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default LayoutA;