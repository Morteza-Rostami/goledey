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
import { useSelector } from "react-redux";
 
// access gates
import GateAuth from "../../HELPERS/Permissions/GateAuth";
import GateGuest from "../../HELPERS/Permissions/GateGuest";
import UserMenu from "../../COMPONENTS/UserMenu/UserMenu";

import LoginModel from '../../PAGES/RegisterPage/LoginModal/LoginModal';
import { UserIco } from "../../SVG/UserIco";

const Header = ({  }) => {
  const itemsCount = useSelector(state => state.cartStore.itemsCount);
  //const authUser = useSelector(state => state.userStore?.user?._id);
  const user = JSON.parse(localStorage.getItem(CONST.AUTH))?.user;

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


          {/* profile */}
          <GateGuest>
            {/* <Link
              to={`/register`}
            >
            <IconButton
              className={`${styles.user_open}`}
            >
              <FaUserCircle
              className={`${styles.ico}`}
              />
            </IconButton>
            </Link> */}

            <LoginModel/>
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