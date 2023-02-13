import React from "react";
import { useState } from "react";
import styled from "styled-components";
//css
import styles from './RelCard.module.scss';
// icons
import { MdKeyboardArrowRight } from 'react-icons/md';
import { TiStarFullOutline } from 'react-icons/ti';
import CONST from "../../../../CONSTANTS/CONST";
import { Button } from "@mui/material";
import FrontHelp from "../../../../HELPERS/frontHelp";

import TomanIco from '../../../../SVG/TomanIco';
import { Link } from "react-router-dom";

const LEN = 14;

const RelCard = ({ related }) => {

  return (
    <div
      id="RelCard"
      className={`${styles.rel_card}`}
    >
      <Link
        to={`/product/${related.slug}`}
        //onClick={() => window.location.reload()}

      >
        <img src={related.pictures[0]} alt="" />
      </Link>
      <div
        className={`${styles.info}`}
      >
        <Link 
          className={`${styles.name}`}
          to={`/product/${related.slug}`}
          //onClick={() => window.location.reload()}
        >
          { FrontHelp.truncate(related.name, LEN) }
        </Link>
        <p
          className={`${styles.price}`}
        >
          <span>
            { FrontHelp.formatMoney(related.price) }
          </span>
          <TomanIco/>
        </p>
      </div>
    </div>
  )
}

// default props
RelCard.defaultProps = {
  related : {}
}

export default RelCard;
