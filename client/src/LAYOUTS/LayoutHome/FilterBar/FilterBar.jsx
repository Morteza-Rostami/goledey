import React from "react";
import styled from "styled-components";
// css
import styles from './FilterBar.module.scss';

// components
import CatTabs from "./CatTabs/CatTabs";
import FilterModal from "./FilterModal/FilterModal";

import useWindowDimensions from '../../../HOOKS/useWindowDimensions';
import CONST from "../../../CONSTANTS/CONST";
import { useLocation } from "react-router-dom";

const FilterBar = ({
  setSubMenuOpen,
}) => {
  const {width, height} = useWindowDimensions();
  const loc = useLocation();
  


  return (
    <div 
      className={`${styles.filter_bar} filterbar center-contain`}
      /* style={{
        display: `${width < CONST.MOBILE && loc.pathname === CONST.HOME ? 'none' : ''}`
      }} */
    >
      <div className={`${styles.inner} contain`}>
        <CatTabs setSubMenuOpen={setSubMenuOpen}/>
        {/* <FilterModal/> */}
      </div>
    </div>
  )
}

export default FilterBar; 