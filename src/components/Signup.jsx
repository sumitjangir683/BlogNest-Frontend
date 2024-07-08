import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { getAllPosts } from '../features/getAllPosts.js'
function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
   const [isLoading , setLoding] = useState(true)
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
       
    const create = async(data) => {
        setError("")
        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('fullName', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('avatar', data.avatar[0]);
            if (data.coverImage && data.coverImage.length > 0) {
              formData.append('coverImage', data.coverImage[0]);
            }
      
            const userData = await axios.post(
              "https://blog-nest-backend.vercel.app/api/v1/users/register",
              formData,
              {
                withCredentials: true 
              }
            );
           // console.log(userData)
           console.log("User registered successfully");
           if(userData){
            console.log(userData);
            dispatch(authLogin({ userData: userData.data.data }));
            const postStore = await fetchPosts(); 
            console.log(postStore);
            postStore.forEach((post) => {
                dispatch(getPostData({ postData: post }));
            })
            setLoding(false)
            navigate("/")
           }
            
            
           
        } catch (error) {
            setError(error.message)
            setLoding(false)
        }

    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px] text-black">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl text-gray-300 font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-gray-300">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-bold text-white text-primary transition-all duration-200 hover:underline "
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Username : "
                        placeholder="Enter your username"
                        {...register("username", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
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
                        {...register("password", {
                            required: true,})}
                        />
                        <Input
                    label="avatar :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("avatar", { required: true })}
                      />
                      <Input
                    label="coverImage :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("coverImage", { required: false })}
                      />
                        <Button type="submit" className="w-full bg-slate-500 hover:bg-slate-700">
                            {isLoading ? "Create Account" : "Please Wait..."}
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup