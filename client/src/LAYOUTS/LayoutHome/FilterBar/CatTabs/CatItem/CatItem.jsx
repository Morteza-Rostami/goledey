import React from "react";
import styles from './CatItem.module.scss';

// material ui
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// redux
import { useDispatch } from "react-redux";

// action
import { setMainAndSubCat } from "../../../../../ACTIONS/categoriesActions";



// component
const CatItem = ({  }) => {

  const handleClose = () => {}
  const cat = {}

  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function pickSubCat(mainCat, subCat) {
    console.log('sub: ', mainCat, subCat);
    dispatch(setMainAndSubCat(mainCat, subCat));
    handleClose();
  }

  return (
    <Box 
    className={`${styles.sub_tab}`}
    sx={{ 
      maxWidth: { xs: 320, sm: 480 }, 
      bgcolor: 'background.paper',
      padding: '0 !important'
    }}
    style={{padding: 0}}
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
          padding: 0,
          // "& button": { borderRadius: 2 },
          // "& button:hover": { backgroundColor: "blue" },
          // "& button:focus": { backgroundColor: "yellow" },
          // "& button:active": { backgroundColor: "green" }
        }}
      >
        { 
          cat.subCats.length
          ? (
            cat.subCats.map((sub, inx) => (
              <Tab 
              className={`${styles.tab}`}
              label={`${sub.name}`} 
              onClick={() => pickSubCat(cat, sub)}
              key={inx}
  
              
              
              />
            ))

          ): ''
        }
        
      </Tabs>
    </Box>
  );
}

export default CatItem;


/*

<div dangerouslySetInnerHTML={{ __html: cat.svg }}></div>


const CatItem = ({ cat }) => {

  return (
    <div className={`${styles.cat_item}`}>
      <p className={`${styles.btn}`}>
        {cat ? cat.name : ''}
      </p>
    
    </div>
  )
}

export default CatItem;




const CatItem = ({ cat }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={styles.cat_item}
      // style={{position: 'relative'}}
    >
      <p
        id="demo-positioned-button"
        className={`${styles.btn}`}
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        // sx={{position: 'relative'}}
      >
        {cat ? cat.name : ''}
      </p>

      {
        cat.subCats.length
          ? (
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'botton',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}

              // PaperProps={{
              //   style: {width: '50%', position: "absolute"}
              // }}
              // sx={{width: '100%'}}
            >
              <MenuItem
              // onClick={handleClose}
              disableRipple
              disableTouchRipple
              sx={{padding: 0, ":hover": "none"}}
              >
                <SubTab handleClose={handleClose} cat={cat}/>
              </MenuItem>
            </Menu>
          ) : ''
      }
    </div>
  )
}
*/