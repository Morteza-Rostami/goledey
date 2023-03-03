import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Badge, IconButton, Select } from "@mui/material";

// logo:
import { Logo } from "../../SVG/Logo";
import Search from "./Search/Search";
import ContainerA from "../../COMPONENTS/containers/ContainerA";

// colors
import COLOR from "../../COLORS/COLORS";
// css
import styles from './Header.module.scss';

// icons
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineMenu } from 'react-icons/md';
import { IoMdCart } from 'react-icons/io';
import CONST, { ICON_SIZE_MOB } from "../../CONSTANTS/CONST";
import { useDispatch, useSelector } from "react-redux";
 
// access gates
import GateAuth from "../../HELPERS/Permissions/GateAuth";
import GateGuest from "../../HELPERS/Permissions/GateGuest";
import UserMenu from "../../COMPONENTS/UserMenu/UserMenu";

import { UserIco } from "../../SVG/UserIco";
import { openRegister } from "../../ACTIONS/msgActions";
import GateAdmin from "../../HELPERS/Permissions/GateAdmin";

const Header = ({  }) => {
  const itemsCount = useSelector(state => state.cartStore.itemsCount);
  //const authUser = useSelector(state => state.userStore?.user?._id);
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;

  const dispatch = useDispatch();

  return (
    <header 
      className={`${styles.header} center-contain`}
    >
      <div className={`${styles.inner} contain`}>
        
        
        {/* logo */}
        <div
          className={`${styles.box_1}`}
        >
          <Link 
          className={`${styles.logo_a}`}
          to={'/'}>
            <Logo styles={styles} />
          </Link>
        </div>
        
        {/* search */}
        <div className={`${styles.search}`}>
          <Search/>
        </div>


        {/* profile */}

        {/* cart */}

        <div
          className={`${styles.box_2}`}
        >

          <GateAdmin>
            <Button
              component={Link}
              to={'/admin/dashboard'}
              style={{ fontSize: '14px', color: COLOR.offWhite }}
              variant="contained"
              color={'secondary'}
            >
              admin
            </Button>
          </GateAdmin>


          {/* profile */}
          <GateGuest>
            <IconButton
              onClick={() => dispatch(openRegister())}
            >
              <UserIco/>
            </IconButton>
          
          </GateGuest>

          <GateAuth>
            {/* <UserMenu pCss={styles}/> */}
            <IconButton
              component={Link}
              to={`/users/dashboard/${user && user._id}`}
            >
              <UserIco/>
            </IconButton>
          </GateAuth>



          {/* cart */}
          <Link
            className={`${styles.cart}`}
            to={`/cart/${user ? user._id : 'guest' }`}
          >
            <IconButton
              className={`${styles.cart_open}`}
            >
              <Badge
                color="secondary" 
                badgeContent={itemsCount}>
                <IoMdCart 
                  className={`${styles.ico}`}
                />
              </Badge>
            </IconButton>
          </Link>
        </div> {/* box_2 */}
      </div> {/* inner */}
    </header>
  )
}

export default Header;