import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { CartIco } from '../../SVG/CartIco';
import { HomeIco } from '../../SVG/HomeIco';
import { ExplorIco } from '../../SVG/ExplorIco';
import { UserIco } from '../../SVG/UserIco';

// css
import styles from './MobNav.module.scss';

import { Link } from 'react-router-dom';
import CONST from '../../CONSTANTS/CONST';
import { useDispatch, useSelector } from 'react-redux';
import { openRegister } from '../../ACTIONS/msgActions';

/* access control */
import GateGuest from "../../HELPERS/Permissions/GateGuest";
import GateAuth from "../../HELPERS/Permissions/GateAuth";


export default function MobNav() {
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  const dispatch = useDispatch();

  return (
    <div
      className={`${styles.mobnav}`}
    >
    <Box 
    
    sx={{ 
      pb: 7,
      position: 'relative',
      zIndex: '1000 !important'
    }} 
    ref={ref}>
   
      <Paper 
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} 
        elevation={3}
        style={{
          paddingTop: '8px',
          paddingBottom: '5px',
        }}
        >
        <BottomNavigation
          //showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <GateGuest>
            <BottomNavigationAction 
              className={`${styles.btn}`}
              icon={<UserIco />} 
              onClick={() => dispatch(openRegister())}
              label={<span>ثبت نام</span>}
              showLabel={true}
            />
          </GateGuest>

          <GateAuth>
            <BottomNavigationAction 
              className={`${styles.btn}`}
              icon={<UserIco />} 
              label={<span>پروفایل</span>}
              showLabel={true}
              component={Link}
              to={`/users/dashboard/${user?._id}`}
            />
          </GateAuth>

          
          <BottomNavigationAction 
          className={`${styles.btn}`}
            icon={<ExplorIco />} 
            component={Link}
            to={`/shop?page=${CONST.PAGE}`}  
            label={<span>گلها</span>}
            showLabel={true}
          />
          
          <BottomNavigationAction 
          className={`${styles.btn}`}
            icon={<HomeIco />} 
            to={'/'}
            component={Link}
            label={<span>خانه</span>}
            showLabel={true}
          />

          <BottomNavigationAction 
          className={`${styles.btn}`}
            //label="" 
            icon={<CartIco/>} 
            component={Link}
            to={'/cart/guest'}
            label={<span>سبد</span>}
            showLabel={true}
          />
        </BottomNavigation>
      </Paper>
    </Box>
    </div>
  );
}
