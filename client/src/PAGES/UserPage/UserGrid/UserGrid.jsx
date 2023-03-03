import React, { useState } from 'react'

// css 
import styles from './UserGrid.module.scss';

import useWindowDimensions from '../../../HOOKS/useWindowDimensions';
import { useEffect } from 'react';
import CONST from '../../../CONSTANTS/CONST';

const UserGrid = ({
  navDisable,
  children
}) => {
  const {width, height} = useWindowDimensions();
  const [navOff, setNavOff] = useState('flex');

  useEffect(() => {
    if (width <= CONST.MOBILE) 
      setNavOff(navDisable ? 'none' : 'flex');

    if (width > CONST.MOBILE)
      setNavOff('flex');
  }, [width]);



  return (
    <div
      className={`${styles.user__grid} center-contain`}
    >
      <div
        className={`${styles.inner} contain-2`}
      >
        <div
          className={`${styles.grid}`}
        >
          <section
            className={`${styles.nav}`}
            style={{
              display: navOff
            }}
          >
            {children.find(({ type }) => type === 'div')}
          </section>

          <section
            className={`${styles.main}`}
            
          >
            {children.find(({ type }) => type === 'section')}
          </section>
        </div>
      </div>

    </div>
  )
}

export default UserGrid