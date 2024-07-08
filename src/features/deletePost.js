import React from 'react'
import axios from 'axios';
const deletePost = async (_id) => {
    console.log("reached",_id);
    try {
      const response = await axios.post(`https://blog-nest-backend.vercel.app/api/v1/post/delete-post/${_id}`,{}, {
        withCredentials: true, // Include credentials (cookies) in the request
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // console.log(response);
      if (response) {
        return response
      } 
    } catch (error) {
      console.error("Error deleting current post:", error);
      
    } 
  };
  export {deletePost}
