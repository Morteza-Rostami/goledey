import React from 'react'
import { useSelector } from 'react-redux'

const IfCartEmp = ({children}) => {
  const cart = localStorage.getItem('cart');

  if (!cart) {
    return <p>Card empty</p>
  }

  return (
    <>{children}</>
  )
}

export default IfCartEmp