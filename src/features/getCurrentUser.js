import React from 'react'
import axios from 'axios';
const getCurrentUser = async () => {
    try {
      const response = await axios.post("https://blog-nest-backend.vercel.app/api/v1/users/current-user",{},  {
  withCredentials: true, // Include credentials (cookies) in the request
  headers: {
    'Content-Type': 'application/json'
  })
     console.log(response);
      if (response) {
        return response
      } 
    } catch (error) {
      console.error("Error fetching current user:", error);
      
    } 
  };
  export {getCurrentUser}
