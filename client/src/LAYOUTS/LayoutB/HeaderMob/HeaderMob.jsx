import React from "react";
// css
import styles from './HeaderMob.module.scss';

// icons
import { MdArrowBackIosNew } from 'react-icons/md' 
import { FaUserCircle } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ContainerA from "../../../COMPONENTS/containers/ContainerA";
import Badge from '@mui/material/Badge';

import {MdClose} from 'react-icons/md';

// redux
import { useSelector } from "react-redux";

import useScrollDirection from '../../../HOOKS/useScrollDirection';

const HeaderMob = () => {
  const itemsCount = useSelector(state => state.cartStore.itemsCount);
  const authUser = false;

  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`${styles.header} product-header header ${ scrollDirection === "down" ? "down" : "up"}`}
    >
      <div
        className={`${styles.inner}`}
      >
      <div className={`${styles.box1}`}>
        <Link 
          className={`${styles.link}`}
          to={'/'}
        >
          <IconButton 
            className={`${styles.close}`}>
            <MdClose 
              className={`${styles.ico}`}/>
          </IconButton>
        </Link>
        
      </div>
      <div className={`${styles.box2}`}>
        <Link
          className={`${styles.cart}`}
          to={`/cart/${authUser ? 'userId' : 'guest' }`}
        >
          <IconButton
            className={`${styles.btn}`}
          >
            <Badge
              className={`${styles.badge}`}
              color="secondary" 
              badgeContent={itemsCount}>
              <IoMdCart 
                className={`${styles.ico} `}
              />
            </Badge>
          </IconButton>
        </Link>
      </div>
      </div> {/* inner */}
    </header>
  )
}

export default HeaderMob;