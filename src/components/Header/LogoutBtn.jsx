import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { makeEmpty } from '../../store/postSlice'
import axios from 'axios'
function LogoutBtn() {
  const navigate = useNavigate();
    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth.userData.accessToken)
  //console.log("sumit",accessToken);
    const logoutHandler = async() => {
       const logout_data = await axios.post("https://blog-nest-backend.vercel.app/api/v1/users/logout", {}, {
        withCredentials: true, 
      });
          if(logout_data){
            dispatch(logout())
            dispatch(makeEmpty())
            navigate("/")
          }
        
           

      
        console.log("Logged out successfully");
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-gray-800 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn