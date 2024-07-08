import React, {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"

import {useForm} from "react-hook-form"

import { getPostData } from '../store/postSlice'
import axios from "axios"
import { getAllPosts } from '../features/getAllPosts.js'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register:register1, handleSubmit:handleSubmit1} = useForm()
    const [error, setError] = useState("")
    const [userID, setUserID] = useState("")

    const fetchPosts = async() => {
        try {
            const postStore = await getAllPosts()
          //console.log(postStore);
            if(postStore){
                return postStore
            }
        } catch (error) {
            throw "error while fetching  posts"
        }
       }
       
    
    const login = async(data) => {
        setError("")
        try {
            const userData = await axios.post(
                "https://blog-nest-backend.vercel.app/api/v1/users/login",
                 {
                    email:data.email,
                    password:data.password
                 },
                 {
                    withCredentials: true 
                 }
            )
            console.log(userData);
            if (userData) {
                dispatch(authLogin({ userData: userData.data.data }));
                const postStore = await fetchPosts(); 
                postStore.forEach((post) => {
                    dispatch(getPostData({ postData: post }));
                })
               
               // console.log(postStore);
                navigate("/")
            }
            console.log("Logged In successfully");
           
            
        } catch (error) {
            setError(error.message)
        }
    }
    const sendingOtp = async(data) => {
        console.log("sending otp",data);
        setError("")
       
        try {
            
            const userId = await authService.createOTPlogin(data)
            if(userId){
                console.log("is in userId");
               setUserID(userId);
              
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-300">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-gray-300">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-bold text-white text-primary transition-all duration-200 hover:underline "
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit1(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register1("email", {
                    required: false,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register1("password", {
                    required: false,
                })}
                />
                <Button
                type="submit"
                className="w-full bg-slate-500 hover:bg-slate-700"
                >Sign in</Button>
            </div>
        </form>
     
        </div>
    </div>
  )
}

export default Login
