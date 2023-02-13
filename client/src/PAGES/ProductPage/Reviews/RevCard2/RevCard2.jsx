import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
//css
import styles from './RevCard2.module.scss';
// icons
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { TiStarFullOutline } from 'react-icons/ti';
import CONST from "../../../../CONSTANTS/CONST";
import { Button } from "@mui/material";

import {BsPersonCircle} from 'react-icons/bs';
import FrontHelp from "../../../../HELPERS/frontHelp";
import Rating from '@mui/material/Rating';


const LEN = 120;

const RevCard2 = ({ review }) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [content, setContent] = useState(FrontHelp.truncate(review.content, LEN));

  const handMoreToggle = () => setMoreOpen(c => !c);

  // run any time moreOpen toggled
  useEffect(() => {
    if (moreOpen) setContent(review.content);
    else setContent(FrontHelp.truncate(review.content, LEN));
  }, [moreOpen, review]);

  return (
    <div
      id="RevCard2"
      className={`${styles.review_card}`}
    >
      <section
        className={`${styles.sec1}`}
      >
        <BsPersonCircle
          className={`${styles.ico}`}
        />
      </section>

      <section
        className={`${styles.sec2}`}
      >
        <div 
        className={`${styles.usercontent}`}>
          <div
            className={`${styles.head}`}
          >
            <div
              className={`${styles.user}`}
            >
              <p
                className={`${styles.name}`}
              >
                سارا بهاری
              </p>
              <p
                className={`${styles.date}`}
              >
                {review.date}
              </p>
            </div>
            <div
              className={`${styles.rating}`}
            >
              <Rating 
              name="read-only" 
              value={Math.floor(review.rating)} 
              readOnly />
            </div>
          </div>
          <p
            className={`${styles.content}`}
          >
            {content && content}
          </p>
        </div> {/* usercontent */}
        <div
          className={`${styles.action}`}
        >
          <div
            className={`${styles.more}`}
          >
            <Button
              className={`${styles.btn}`}
              onClick={() => handMoreToggle()}
              size={'small'}
              endIcon={<MdOutlineKeyboardArrowLeft className={`${styles.ico}`}/>}
            >
              <span>بیشتر</span> 
            </Button>
          </div>
          
        </div>
      </section>
    </div> /* card */
  )
}

// content: open/close
// const CONTENT = styled.p`
//   height: ${props => props.isOpen ? 'auto' : '50px'};
//   overflow: ${props => props.isOpen ? 'auto' : 'hidden'};
// `;


// default props
RevCard2.defaultProps = {
  review : {}
}

export default RevCard2;
