import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const getCurrentPost = async (_id) => {
   // const { _id } = useParams()
    try {
      const response = await axios.post(`https://blog-nest-backend.vercel.app/api/v1/post/post/${_id}`,{}, {
        withCredentials: true, // Include credentials (cookies) in the request
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // console.log(response);
      if (response.data && response.data.data) {
        return response.data.data
      } 
    } catch (error) {
      console.error("Error fetching current post:", error);
      
    } 
  };
  export {getCurrentPost}
