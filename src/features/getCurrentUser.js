import axios from 'axios';

const getCurrentUser = async () => {
  try {
    const response = await axios.post(
      "https://blog-nest-backend.vercel.app/api/v1/users/current-user",
      {}, // Empty body if not required
      {
        withCredentials: true, // Include credentials (cookies) in the request
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Response:", response.data); // Log response data
    return response.data; // Return the user data if successful
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export { getCurrentUser };
