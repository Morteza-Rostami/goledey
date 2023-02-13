import React from 'react'

// css
import styles from './NavItem.module.scss';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Button } from '@mui/material';
import { MdErrorOutline, MdOutlineError } from 'react-icons/md';
import COLOR from '../../../../../COLORS/COLORS';

const NavItem = ({
  icon,
  title,
  link,
  page,
  cssName,
  button,
  handClick,
  error,
}) => {

  /* const makeItem = useMemo(() => {
    return () => (
      button ? (
        <Button

          startIcon={icon}
          size='large'
          onClick={handClick}
        >
          {title}
        </Button>
      ) : (
        <Button
          startIcon={icon}
          endIcon={ error ? <MdErrorOutline color={COLOR.warning_300}/> : '' }
          disabled={ !link ? true : false }
          size='large'
        >
          {title}
        </Button>
      )
    ) 
  }, []); */

  return (
    <li
      className={`${styles.item} ${cssName}`}
    >
      {
        link
        ? (
          <>
            <Button
              className={`${styles.btn}`}
              component={Link}
              to={link}
              //startIcon={icon}

            >
              <span>
                { icon }
                { title }
              </span>
              <span className={`${styles.err}`}>
                {error ? <MdOutlineError color={COLOR.error_150}/> : ''}
              </span>
            </Button>
          </>
        ) : (
          <Button
            className={`${styles.btn} ${styles.logout}`}
            startIcon={icon}
            size='large'
            onClick={handClick}
          >
            { title }
          </Button>
        )
      }
    </li>
  )
}

export default NavItem