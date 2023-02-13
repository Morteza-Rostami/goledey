import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SubCats from '../SubCats/SubCats';
import { useSelector } from 'react-redux';

// css
import styles from './SubMenuDrop.module.scss';

export default function SubMenuDrop({
  subMenuOpen,
  setSubMenuOpen,
}) {
  // active tab 
  const activeTab = useSelector(state => state.categoriesStore?.activeCat);
  const ref = useRef(null);
  // const { onClickOutside } = props;

  useEffect(() => {
    // if: there is activeTab -> set the event
    if (Object.keys(activeTab)?.length) {
      const handleClickOutside = (event) => {
        const nodeId = event.target.id || event.target.parentNode.getAttribute('id');

        // check if clicked element is not active tab:
        if (nodeId !== activeTab.slug) {
          if (ref.current && !ref.current.contains(event.target)) {
            setSubMenuOpen && setSubMenuOpen(false);
          }
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };

    }
  }, [ setSubMenuOpen, activeTab]);

  return (
    <div
      className={`${styles.sub_menu} submenu center-contain`}
    >
      <div 
        className={`${styles.inner} contain`}
      >

      <Accordion
        expanded={subMenuOpen}
        ref={ref}
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            display: 'none'
          }}
        >
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <SubCats setSubMenuOpen={setSubMenuOpen}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div> {/* inner */}
    </div>
  );
}