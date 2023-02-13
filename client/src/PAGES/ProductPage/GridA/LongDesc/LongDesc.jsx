import { Button } from '@mui/material'
import React, { useEffect } from 'react'

// css
import styles from './LongDesc.module.scss';

import {MdOutlineKeyboardArrowLeft} from 'react-icons/md';
import { useState } from 'react';
import FrontHelp from '../../../../HELPERS/frontHelp';
import HorizLine from '../../../../COMPONENTS/HorizLine/HorizLine';
import Inner from '../../../../COMPONENTS/Inner/Inner';

import { Markup } from "react-render-markup";
import {convert} from 'html-to-text';

//const text = 'امکان برگشت کالا در گروه موبایل با دلیل "انصراف از خرید" تنها در صورتی مورد قبول است که پلمب کالا باز نشده باشد. تمام گوشی‌های دیجی‌کالا ضمانت رجیستری دارند. در صورت وجود مشکل رجیستری، می‌توانید بعد از مهلت قانونی ۳۰ روزه، گوشی خریداری‌شده را مرجوع کنید.';
const LEN = 120;

const LongDesc = ({
  product,
  cssName
}) => {
  const LongDesc = convert(product.longDesc);
  
  const [moreOpen, setMoreOpen] = useState(false);
  const [content, setContent] = useState(FrontHelp.truncate(LongDesc, LEN));

  const handMoreToggle = () => setMoreOpen(c => !c);

  // run any time moreOpen toggled
  useEffect(() => {
    if (moreOpen) setContent(LongDesc);
    else setContent(FrontHelp.truncate(LongDesc, LEN));
  }, [moreOpen]);

  useEffect(() => {
    setContent(FrontHelp.truncate(LongDesc, LEN));
  }, [LongDesc]);

  // if no longDesc
  if (!product?.longDesc) {
    return <></>
  }

  return (
    <div
      className={`${styles.long_desc} ${cssName.longdesc}`}
    >
      <Inner
        css={styles.inner}
      >
      <h2
        className={`${styles.head}`}
      >
        توضیحات محصول
      </h2>
      <p
        className={`${styles.content}`}
      >
        { content }
      </p>
      <Button
        className={`${styles.more}`}
        onClick={() => handMoreToggle()}
        size={'small'}
        endIcon={<MdOutlineKeyboardArrowLeft className={`${styles.ico}`}/>}
      >
        <span>بیشتر</span> 
      </Button>

      {/* line */}
      <HorizLine css={styles.line}/>
    </Inner>
    </div>
  )
}

export default LongDesc