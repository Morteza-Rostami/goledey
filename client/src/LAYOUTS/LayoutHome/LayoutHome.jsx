import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import COLOR from "../../COLORS/COLORS";
//css
import styles from './LayoutHome.module.scss';
import FilterBar from "./FilterBar/FilterBar";
// import SubCats from "./SubCats/SubCats";
import TopHeaderAd from "../../COMPONENTS/TopHeaderAd/TopHeaderAd";
import MobNav from "../MobNav/MobNav";
import SubMenuDrop from "./SubMenuDrop/SubMenuDrop";

import { useState } from "react";

const LayoutHome = ({ children }) => {

  /* accardion sub menu: open/close */
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  
  function toggleSubMenu() {setSubMenuOpen(prv => !prv)}

  return (
    <div
      className={`${styles.layout_home}`}
    >
      <TopHeaderAd/>
      {/* <div
        className={`${styles.header_wrap}`}
      > */}
        <Header bgColor={COLOR.light}/>
      {/* </div> */}

      <section
        className={`${styles.filters}`}
      >
        <FilterBar setSubMenuOpen={toggleSubMenu} />
        <SubMenuDrop 
          subMenuOpen={subMenuOpen} 
          setSubMenuOpen={setSubMenuOpen}
        />

      </section>

      

      <main 
        className={`${styles.main}`}
      >
        {children}
      </main>
      <Footer/>
      {/* mobile nav */}
      <MobNav/>
    </div>
  )
}

export default LayoutHome;