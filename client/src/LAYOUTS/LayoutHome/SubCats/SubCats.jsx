import React from "react";
import { useEffect } from "react";

// css
import styles from './SubCats.module.scss';

// material ui
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// redux
import { useDispatch, useSelector } from "react-redux";

// action
import { setMainAndSubCat } from "../../../ACTIONS/categoriesActions";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSearchParamsState } from "../../../HOOKS/useSearchParamsState";
import CONST from "../../../CONSTANTS/CONST";

// css animation
import 'animate.css';

// component
const SubCats = ({ setSubMenuOpen }) => {
  // main category object
  const mCat = useSelector(state => state.categoriesStore?.activeCat);
  // array: sub categories
  const sCats = useSelector(state => state.categoriesStore?.activeCat?.subCats);

  // state of repaint sub-cat
  const rePaint = useSelector(state => state.categoriesStore.catRePaint);

  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const loc = useLocation();
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function pickSubCat(mCat, sCat) {

    // if (loc.pathname === CONST.HOME) {
    // } 
    // else if (loc.pathname === CONST.SHOP) {
    // }

    // close sub- menu
    setSubMenuOpen(false);

    navigate({ pathname: '/shop', search: `?mCat=${mCat.slug}&sCat=${sCat.slug}&page=1` },);

  }

  return (
    <div
      className={`${styles.sub_cats} subcats`}
    >
      <div
        className={`${styles.inner}`}
      >
      <Tabs
      className={`${styles.tabs}`}
        orientation="horizontal"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        TabIndicatorProps={{
          style: {display: 'none', padding: 0}
        }}
        textColor="secondary"
        sx={{
          justifyContent: 'center',
          padding: 0,
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
          }
          // "& button": { borderRadius: 2 },
          // "& button:hover": { backgroundColor: "blue" },
          // "& button:focus": { backgroundColor: "yellow" },
          // "& button:active": { backgroundColor: "green" }
        }}
      >
        { 
          mCat && Object.keys(mCat).length
          ? (
            sCats?.map((sub, inx) => (
              <Tab 
              className={`${styles.tab}`}
              label={
              <span 
              className="animate__animated animate__bounceInDown"
              style={{
                display: rePaint,
              }}
              >{sub.name}</span>
              } 
              onClick={() => pickSubCat(mCat, sub)}
              key={inx}
  
              
              />
            ))

          ): ''
        }
        
      </Tabs>
      </div> {/* inner */}
    </div>
  );
}

export default SubCats;