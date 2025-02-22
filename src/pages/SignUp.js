import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Parse from '../service/parse'
import { MoonLoader } from "react-spinners";
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
            const loggedIn=Parse.User.current();
            if(loggedIn){
                navigate('/todo')
            }
        })
   
    const [data,setData]=useState({
        username:"",
        email:"",
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
        const user=new Parse.User();
        try {
            setLoading(true)
            user.set('username',data.username);
            user.set('email',data.email);
            user.set('password',data.password);
            const response=await user.signUp();
            toast.success('SignUp successfully')
            navigate('/todo')
            console.log(response);
            
        } catch (error) {
            toast.error('error doing signup')
            navigate('/')
            console.log('error doing signup',error);
            
            // throw new Error(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div style={{height:"100vh", width:"100vw", overflow:"hidden"}} className='d-flex align-items-center justify-content-center px-2'>
        <div className='d-flex align-items-center justify-content-center flex-column gap-3 px-4 py-3 width-max' style={{border:"1px solid lightgray",borderRadius:"12px"}}>
                <h1>SignUp</h1>
                <div className='w-100 d-flex align-items-center justify-content-start flex-column gap-2'>
                    <label className='w-100 fs-5 fw-normal'>Username</label>
                    <input className='w-100 px-2 py-2 rounded' type='text' name='username' placeholder='user_name' onChange={handlechange}/>
                    <label className='w-100 fs-5 fw-normal'>Email</label>
                    <input className='w-100 px-2 py-2 rounded' type='email' name='email' placeholder='abc@gmail.com' onChange={handlechange}/>
                    <label className='w-100 fs-5 fw-normal'>Passowrd</label>
                    <input className='w-100 px-2 py-2 rounded' type='text' name='password' placeholder='**********' onChange={handlechange}/>
                    <button className='w-100 px-2 py-2 rounded my-3 bg-primary btn text-white d-flex align-items-center justify-content-center' onClick={handleClick}>{loading && <MoonLoader size={15} color="white"/>}SignUp</button>
                    <p>Already have an account? please <Link to='/'>SignIn</Link></p>
                </div>
        </div>
    </div>
  )
}

export default SignUp