import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";
import MyPosts from './pages/MyPosts.jsx'
import Profile from './pages/Profile.jsx'
import SearchResult from './components/SearchResult.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:_id",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:_id",
            element: <Post />,
        },
        {
            path: "/my-post",
            element:(
                <AuthLayout authentication>
                    {" "}
                    <MyPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/profile",
            element:(
                <AuthLayout authentication>
                    {" "}
                    <Profile />
                </AuthLayout>
            ),
        },
        {
            path: "/searchResult/:title",
            element:(
                <AuthLayout authentication>
                    {" "}
                    <SearchResult />
                </AuthLayout>
            ),
        }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
   
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
   
)
