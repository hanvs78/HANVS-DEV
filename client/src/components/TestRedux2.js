import React from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../store/userSlice'

const TestRedux2 = () => {
  const dispatch = useDispatch()
  
  return (
    <div>TestRedux2
      <br/>
      <button onClick={()=>dispatch(login())}>Redux-Login</button>
      <br/>
      <button onClick={()=>dispatch(logout())}>Redux-Logout</button>
    </div>
  )
}

export default TestRedux2