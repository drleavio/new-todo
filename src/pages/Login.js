import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Parse from '../service/parse'

const Login = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        const loggedIn=Parse.User.current();
        if(loggedIn){
            navigate('/todo')
        }
    })
   
    const [data,setData]=useState({
        username:"",
        password:""
    })
    const handlechange=(e)=>{
        const {name,value}=e.target;
        setData({
            ...data,
            [name]:value
        })
    }
    const handleClick=async()=>{
        try {
           
            const response=await Parse.User.logIn(data.username,data.password);
            navigate('/todo')
            console.log(response);
            
        } catch (error) {
            throw new Error(error)
        }
    }
  return (
    <div style={{height:"100vh", width:"100vw", overflow:"hidden"}} className='d-flex align-items-center justify-content-center'>
        <div className='d-flex align-items-center justify-content-center flex-column gap-3 px-4 py-3' style={{border:"1px solid lightgray",borderRadius:"12px"}}>
                <h1>Login</h1>
                <div className='w-100 d-flex align-items-center justify-content-start flex-column gap-2'>
                    <label className='w-100 fs-5 fw-normal'>Username</label>
                    <input className='w-100 px-2 py-2 rounded' type='text' name='username' placeholder='user_name' onChange={handlechange}/>
                    <label className='w-100 fs-5 fw-normal'>Passowrd</label>
                    <input className='w-100 px-2 py-2 rounded' type='text' name='password' placeholder='**********' onChange={handlechange}/>
                    <button className='w-100 px-2 py-2 rounded my-3 bg-primary btn text-white' onClick={handleClick}>Login</button>
                    <p>Don't have an account? please <Link to='/signup'>Signup</Link></p>
                </div>
        </div>
    </div>
  )
}

export default Login