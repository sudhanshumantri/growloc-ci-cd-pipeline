import React, { useEffect, useState } from 'react'
import { ROLE_BASED_ACCESS } from '../../../config'

const AuthOutlet = ({
  children,
  isAuthRequired,
  from,
  action,
  defaultReturn
}) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  useEffect(() => {
    if (isAuthRequired) {
      const AUTH_OBJECT = JSON.parse(localStorage.getItem('AUTH_OBJECT'))
      if (AUTH_OBJECT) {
        const role = AUTH_OBJECT.profile.role
        const actions = ROLE_BASED_ACCESS[from][role]
        const isAuth = (actions || []).includes(action)
        setIsAuthorized(isAuth || false)
      } else {
        setIsAuthorized(false)
      }
    } else {
      setIsAuthorized(true)
    }
  }, [isAuthRequired])

  return isAuthorized ? <>{children}</> : defaultReturn || ''
}
export default AuthOutlet
