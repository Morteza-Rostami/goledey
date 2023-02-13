import React from 'react'

import propTypes from 'prop-types'

const HorizLine = ({
  css,
}) => {
  return (
    <div 
      className={`${css}`}
    style={{
      // border: '.1rem solid #B7BAB5',
      height: '.1rem',
      background: '#B7BAB5',
      width: '100%',
      alignSelf: 'center',
    }}>
      
    </div>
  )
}

HorizLine.defaultProps = {
  styles : propTypes.object,
}

export default HorizLine