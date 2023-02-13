import React from 'react'
import useWindowDimensions from '../../HOOKS/useWindowDimensions'

import PropTypes from 'prop-types';
import CONST from '../../CONSTANTS/CONST';

//css
import styles from './AutoLayout.module.scss';

const AutoLayout = ({
  headerMob,
  headerDec,
  footerMob,
  footerDec,
  children
}) => {
  const {width, height} = useWindowDimensions();

  return (
    <div
      className={`${styles.auto__layout}`}
    >
      {
        width <= CONST.MOBILE
        ? (
          headerMob && headerMob
        ) : (
          headerDec && headerDec
        )
      }
      <main 
        className={`${styles.main}`}
      >
        {children}
      </main>

      {
        width <= CONST.MOBILE
        ? (
          footerMob && footerMob
        ) : (
          footerDec && footerDec
        )
      }
      
    </div>
  )
}

AutoLayout.porpTypes = {
  headerMob: PropTypes.node,
  headerDec: PropTypes.node,
  footerMob: PropTypes.node,
  footerDec: PropTypes.node,
}

AutoLayout.defaultProps = {
  headerMob: '',
  headerDec: '',
  footerMob: '',
  footerDec: '',
}

export default AutoLayout