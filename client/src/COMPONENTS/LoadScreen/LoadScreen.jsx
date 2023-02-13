import React from 'react'

// css 
import styles from './LoadScreen.module.scss';
import LogoCheckIco from '../../SVG/checkoutSVG/LogoCheckIco';
import { useSelector } from 'react-redux';

const LoadScreen = () => {
  const screenLoading = useSelector(state => state.msgStore.screenLoading);

  if (!screenLoading) {
    return <></>
  }

  return (
    <div
      className={styles.backdrop}
    >
      <div
        className={`${styles.loading}`}
      >
        <div
          className={`${styles.top}`}
        >
          <div className={`${styles.logo}`}>
            <LogoCheckIco/>
          </div>
        </div>
        <div
          className={`${styles.mid}`}
        >
          <div 
          className={`${styles.spinner}`}
          style={{
            background: 'url("/images/animations/Rolling-1s-224px.svg")', 
          }}
          ></div>
        </div>

        <div 
          className={`${styles.bott}`}
        >
          <div
            className={`${styles.msg}`}
          >
            <span
              className={`${styles.spinner}`}
              style={{
                background: 'url("/images/animations/Spinner-1s-200px.svg")', 
              }}
            ></span>

            <span
              className={`${styles.txt}`}
            >
              در حال بارگذاری!
            </span>
          </div>
          <p
            className={`${styles.subtext}`}
          >
            چند ثانیه بیشتر طول نمیکشه ...!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadScreen