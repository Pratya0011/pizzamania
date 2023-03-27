import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dropdown() {
    const navigate = useNavigate()

    const logout=()=>{
        localStorage.removeItem('loggedIn')
        navigate('/')
    }
  return (
    <div >
    <div className='dropDown'>
        
        <div onClick={()=>{navigate('/Profile/account')}}>Profile</div>
        <div onClick={()=>{logout()}}>Logout</div>
        
    </div>
    <div className='arrow'></div>
    </div>
  )
}

export default Dropdown