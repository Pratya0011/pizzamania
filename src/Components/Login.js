import React,{useState,useContext} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import stateContext from './Context'



function SignUp() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [display,setDisplay]=useState('active')
  const [arr,setArr]=useState([])
  const state = useContext(stateContext)
  const navigate = useNavigate()
 
  const onSubmitHandler=(e)=>{
    const loggedIn = {
      isLoggedIn:'',
      id:''
    }
    e.preventDefault()
    if(username==='' && password===''){
      setDisplay('deActive')
    }
    else if(JSON.parse(localStorage.getItem('userData'))){
      const data = JSON.parse(localStorage.getItem('userData')).filter((data)=>{
        if(data.username === username && data.password===password)
        return data
        else
        return null
      })
      if(data.length!==0 && state.route){
        loggedIn.isLoggedIn=true;
        loggedIn.id=data[0].id
        localStorage.setItem('loggedIn',JSON.stringify(loggedIn))
        navigate(`/${state.route}`)
        setArr([])
      }
      else if(data.length!==0 && !state.route){
        loggedIn.isLoggedIn=true;
        loggedIn.id=data[0].id
        localStorage.setItem('loggedIn',JSON.stringify(loggedIn))
        navigate('/Order')
        setArr([])
      }
      else{
        setDisplay('deActive')
    }
    }else{
      setDisplay('deActive')
    }
  }
  return (
    <>
    <div className='login-div'>
    <div className='login'>
      <h2>Login to Continue</h2>
      <div className={display}>Invalid Credentials</div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='username'>Username:</label>
        <input 
          type='text' 
          id='username' 
          placeholder='Enter Username' 
          onChange={(e)=>{setUsername(e.target.value)}}
        /><br/>
        <label htmlFor='password'>Password:</label>
        <input 
          type='password' 
          id='password' 
          placeholder='Enter Password' 
          onChange={(e)=>{setPassword(e.target.value)}}
        /><br/>
        <button type='submit' >Login</button>
      </form>
      <p onClick={(e)=>{navigate('/SignUp')}}>Create Account</p>
    </div>
    </div>
    </>
  )
}

export default SignUp