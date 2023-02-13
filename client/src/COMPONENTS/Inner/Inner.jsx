import React from 'react'

const Inner = ({
  css,
  children
}) => {
  return (
    <div
      className={`${css}`}
    >
      { children }
    </div>
  )
}

export default Inner