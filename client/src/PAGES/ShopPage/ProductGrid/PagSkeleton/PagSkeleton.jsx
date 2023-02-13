import React from 'react'
// skeleton loading
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

//css
import styles from './PagSkeleton.module.scss';

import COLOR from '../../../../COLORS/COLORS';

const PagSkeleton = () => {
  return (
    <div
      className={`${styles.pag__skelet}`}
    >
      <Skeleton
        direction='rtl'
        height={32}
        width={32}
        circle
      />
      <div
        className={`${styles.mid}`}
      >
        <Skeleton
        direction='rtl'
        height={32}
        width={32}
        circle

        />
        <Skeleton
        direction='rtl'
        height={32}
        width={32}
        circle

        />
        <Skeleton
        direction='rtl'
        height={32}
        width={32}
        circle

        />
      </div>
      <Skeleton
        direction='rtl'
        height={32}
        width={32}
        circle
        // baseColor={COLOR.offWhite}
        // highlightColor={COLOR.bg}
      />
    </div>
  )
}

export default PagSkeleton