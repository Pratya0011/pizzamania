import React,{useContext} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import stateContext from './Context'

function Home() {
  const state = useContext(stateContext)
  const navigate = useNavigate()
  const onClickHandler=()=>{ 
      navigate('/Order')
  }
  return (
    <>
    <div className='main'>
         <div className='info'>  
           <div>Are You Hungry?</div>
           <div>Dont Wait !</div>
          </div>
       <button id='info' onClick={onClickHandler}>Order Now</button>
      
     </div>
    </>
  )
}


export default Home