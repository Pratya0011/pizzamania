import React from 'react'
import { Navigate } from 'react-router-dom'


function PrivateRoute({children}) {
    const isLoggedIn=JSON.parse(localStorage.getItem('loggedIn'))
  return isLoggedIn?isLoggedIn.isLoggedIn?children:<Navigate to='/pizzamania/Login'/>:<Navigate to='/Login'/>
}

export default PrivateRoute