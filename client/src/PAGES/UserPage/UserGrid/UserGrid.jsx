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
    console.log(width);
    if (width <= CONST.MOBILE) 
      setNavOff(navDisable ? 'none' : 'flex');

    if (width > CONST.MOBILE)
      setNavOff('flex');
  }, [width]);

  console.log(children)


  return (
    <div
      className={`${styles.user__grid}`}
    >
      <div
        className={`${styles.inner}`}
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