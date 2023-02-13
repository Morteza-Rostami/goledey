import React from 'react'

const Grid = ({
  css,
  children
}) => {
  return (
    <div
      className={`${css}`}
    >
      {children}
    </div>
  )
}

export default Grid