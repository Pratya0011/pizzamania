import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [total,setTotal] = useState('')
  const [arr,setArr]=useState([])
  const [cartCounts,setCartCounts]=useState('')
  const navigate = useNavigate()

  const userId = JSON.parse(localStorage.getItem('loggedIn'))
  const userCart = JSON.parse(localStorage.getItem('userData'))
  let cartItems = userCart[userId.id].cartCount
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  useEffect(()=>{
    const number = userCart[userId.id].cart.reduce((num,data)=>{
      return num + data.price * data.no
    },0)
    setTotal(number)
    setCartCounts(cartItems)
    userCart[userId.id].total=total
    localStorage.setItem('userData',JSON.stringify(userCart))
  },[cartItems,total,userCart,userId.id])

  const remove=(id)=>{
    const arr = []
    userCart[userId.id].cart.map((data)=>{
      if(data.Id===id){
        data.no <= 1 ? data.no = 1 : data.no--
      }
      arr.push(data)
      return arr
    })
    userCart[userId.id].cart=arr
    setArr(arr)
    localStorage.setItem('userData',JSON.stringify(userCart))
    }
  const add=(id)=>{
    const arr = []
    userCart[userId.id].cart.map((data)=>{
      if(data.Id===id){
        data.no++
      }
      arr.push(data)
      return arr
    })
    userCart[userId.id].cart=arr
    setArr(arr)
    localStorage.setItem('userData',JSON.stringify(userCart))
  }
  const erase=(id)=>{
    if(userCart[userId.id].cart.length <=1){
    const item=userCart[userId.id].cart.filter((item)=>item.Id!==id)
    userCart[userId.id].cart=item
    cartItems=0
    userCart[userId.id].cartCount = cartItems
    localStorage.setItem('userData',JSON.stringify(userCart))
    setArr(item)
    }else{
    const item=userCart[userId.id].cart.filter((item)=>item.Id!==id)
    userCart[userId.id].cart=item
    cartItems--
    userCart[userId.id].cartCount = cartItems
    localStorage.setItem('userData',JSON.stringify(userCart))
    setArr(item)
    }
  }
  return (
    <div className='container-cart'>
      <h2 className='cart-heading'>Items on Cart</h2>
      <div className='cart-div'>
      <div className='main-div'>
      {userCart[userId.id].cart.length===0 && 
      <div className='empty-cart'>
         <img src="data:image/png;base64,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"
         alt='empty' height='200px'/>
         <div>Empty</div>
      </div>}
        {userCart[userId.id].cart.map((data,index)=>(
          <div className='container-div' key={index}>
            <div><img src={data.image} height='150px' alt='pizza'/></div>
            <div className='item-details'>
              <div className='item-name'>{data.name}</div>
              <div className='item-size'>{data.size}</div>
              <div className='item-price'>₹{data.price * data.no}</div>
            </div>
            <div className='cart-button'>
              
              <button onClick={()=>{remove(data.Id)}}>-</button>
              <div>{data.no}</div>
              <button onClick={()=>{add(data.Id)}}>+</button>
              <button className='remove' onClick={()=>{erase(data.Id)}}>+</button>
            </div>
          </div>
        ))}
      </div>
      {cartCounts!==0 && <div className='price-details'>
        <div className='heading'>PRICE DETAILS</div>
        <div className='item-value'>
          <span>Price  ({cartCounts} item)</span>
          <span>₹{total}</span>
        </div>
        <div className='item-count'>
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>
        <div className='place-order'><button onClick={(e)=>{navigate('/Checkout')}}>Place Order</button></div>
      </div>}
      </div>
    </div>
  )
}

export default Cart