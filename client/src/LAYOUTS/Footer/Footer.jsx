import React from "react";

// css
import styles from './Footer.module.scss';
import EnLogo from "../../SVG/EnLogo";
import { IconButton } from "@mui/material";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { BsTelegram } from "react-icons/bs";
import CONST from "../../CONSTANTS/CONST";
import { Link } from "react-router-dom";
import COLOR from "../../COLORS/COLORS";

// icons
import AdminPhoneIco from '../../SVG/footerSVG/AdminPhoneIco'
import WhatsIco from '../../SVG/footerSVG/WhatsIco'
import InstaIco from '../../SVG/footerSVG/InstaIco'
import TeleIco from '../../SVG/footerSVG/TeleIco'


const Footer = ({ children }) => {

  return (
    <div 
      className={`${styles.footer} center-contain`}
    >
      <div
        className={`${styles.inner} contain`}
      >

        <div
          className={`${styles.box_1}`}
        >
          <p>
            <span className={`${styles.txt}`}>
              <AdminPhoneIco/>
            </span>
            <span 
            className={`${styles.num}`}
            dir="ltr">
              0936 - 555 91 58
            </span>
          </p>
        </div>

        <div
        className={`${styles.box_2}`}
        >
          <div 
            className={`${styles.medias}`}
          >
              <IconButton>
                <InstaIco/>
              </IconButton>
              <IconButton>
                <WhatsIco/>
              </IconButton>
              <IconButton>
                <TeleIco/>
              </IconButton>
          </div>
          
        </div> {/* box_2 */}

        <div
            className={`${styles.logobox}`}
          >
          <Link
            to={'/'}
          >
            <EnLogo/>
          </Link>
        </div>

      </div> {/* inner */}

    </div>
  )
}

export default Footer;