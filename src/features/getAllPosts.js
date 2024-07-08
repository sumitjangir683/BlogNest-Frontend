import React from 'react'
import axios from 'axios';
const getAllPosts = async () => {
    try {
      const response = await axios.post("https://blog-nest-backend.vercel.app/api/v1/post/all-posts",{},  {
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
      console.error("Error fetching current user:", error);
      
    } 
  };
  export {getAllPosts}
