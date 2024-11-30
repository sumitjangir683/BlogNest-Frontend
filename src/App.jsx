import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch, useSelector} from 'react-redux'
import {login,logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'
import { getPostData } from './store/postSlice'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from './features/getCurrentUser.js'
import { getAllPosts } from './features/getAllPosts.js'
import { ChevronRight, LoaderCircleIcon } from "lucide-react";
function App() {
 const [loading, setLoading] = useState(true)
 const dispatch = useDispatch()
 const navigate = useNavigate()
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
 useEffect(() => {
  const fetchCurrentUser = async() => {
    try {
      const response = await getCurrentUser()
      console.log("in refresh",response)
      if (response.data) {
        dispatch(login({ userData: response.data }));
       console.log("in refresh",response)
        const postStore = await fetchPosts(); 
        postStore.map((post) => {
            dispatch(getPostData({ postData: post }));
        })
       
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  }
  fetchCurrentUser()
}, []);

  return !loading ? (
   <div className='min-h-screen flex flex-wrap 
   content-between bg-gray-900'>
   <div className='w-full block'>
    <Header/>
    <main >
      <Outlet/>
    </main>
    <Footer/>
   </div>
   </div>
  ) : (<div className="flex items-center justify-center min-h-screen">
    <LoaderCircleIcon className="animate-spin w-16 h-16" />
  </div>
  )
}

export default App
