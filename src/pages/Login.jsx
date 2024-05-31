import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import AuthContext from '../context/AuthContext'

const Login = () => {
let Navigate=useNavigate();
let emailRef=useRef();
let passwordRef=useRef();

let store=useContext(AuthContext)
console.log(store)

const handlelogin=async()=>{
  let obj={
    email:emailRef.current.value,
    password:passwordRef.current.value

  }
  console.log(obj)

  let res =await axios.post('https://blog-backend-wvak.onrender.com/login',obj)

  console.log(res.data)

  if(res.data.success){

    localStorage.setItem('userDetails',JSON.stringify(res.data.userDetails))

    store.setuserDetail({
      name:res.data.userDetails.name,
      _id:res.data.userDetails._id,
      login:true
    })
    Navigate('/')
    toast.success(res.data.msg, {position:'top-center'})
  }
  else{
    toast.error(res.data.msg,{position:'top-center'})
  }
}








  return (
    <div className='loginPage'>
        <h1>Login Page</h1>
    
        <label htmlFor="">Email</label>
        <input ref={emailRef} type="email" />
        <label htmlFor="">Password</label>
        <input ref={passwordRef} type="password" />
         <p>Not a user?  <Link to="/register">Signup?</Link>   </p>
        <button onClick={handlelogin}>Submit</button>
    </div>
  )
}

export default Login
