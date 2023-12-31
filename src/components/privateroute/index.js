import React from 'react'
import { Navigate } from 'react-router-dom'
const PrivateOutlet = ({ token, children }) => {
  return token ? children : <Navigate to='/login' />
}
export default PrivateOutlet
