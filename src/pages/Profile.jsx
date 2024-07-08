import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { login } from '../store/authSlice';

function Profile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const posts = useSelector((state) => state.posts); // Assuming posts are stored in the Redux store
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const user=useSelector((state) => state.auth.userData);
    const postStore = useSelector((state) => state.post_store.posts);
    //console.log(postStore);
    // console.log(user);
    if (!user) {
        return <div className='flex justify-center'>Loading...</div>; 
    }
    const myId=user._id;
    const myPosts = postStore.filter(post => post.postData.postData.owner=== myId);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            fullName: userData.fullName || '',
            email: userData.email || '',
        },
    });

    const saveProfile = async (data) => {
        try {
            const formData = new FormData();
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            if (data.avatar && data.avatar.length > 0) {
                formData.append('avatar', data.avatar[0]);
            }
            if (data.coverImage && data.coverImage.length > 0) {
                formData.append('coverImage', data.coverImage[0]);
            }

            const response = await axios.post(
                'https://blog-nest-backend.vercel.app/api/v1/users/edit-profile',
                formData,
               {
        withCredentials: true, // Include credentials (cookies) in the request
        headers: {
          'Content-Type': 'application/json'
        }
            );

            if (response.data) {
                dispatch(login({ userData: response.data.data }));
                setIsDialogOpen(false);
                navigate(-1);
            }

        } catch (error) {
            console.error(error.message || 'Error while updating profile');
        }
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-black">
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-6 mt-10">
                <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
                    <img
                        src={userData.coverImage}
                        alt="Cover"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex justify-end items-start p-4">
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="bg-gray-900 text-white px-3 py-1 rounded-md shadow-md"
                        >
                            Edit Cover Photo
                        </button>
                    </div>
                </div>
                <div className="relative -mt-16 flex items-end px-6">
                    <div className="w-32 h-32 bg-gray-900 rounded-full border-4 border-gray-800 overflow-hidden">
                        <img
                            src={userData.avatar}
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold text-white">{userData.fullName}</h1>
                        <p className="text-gray-400">@{userData.username}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
                    >
                        Edit Profile
                    </button>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <div className="bg-gray-800 rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-bold text-white">Your Blogs</h2>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                            {myPosts.length > 0 ? myPosts.map((post, index) => (
                                    <div key={index} className="relative w-full h-32 bg-gray-700 rounded-lg overflow-hidden">
                                        <img
                                            src={post.postData.postData.image}
                                            alt={`Post ${index + 1}`}
                                            className="object-cover w-full h-full cursor-pointer"
                                            onClick={() => navigate(`/post/${post.postData.postData._id}`)}
                                        />
                                        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-2 cursor-pointer" onClick={() => navigate(`/post/${post.postData.postData._id}`)}>
                                        
                                            <h1 className="font-semibold text-xl text-white">{post.postData.postData.title}</h1>
                                            
                                        </div>
                                    </div>
                                )) : <p className="text-white">No blogs to show</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-gray-800 rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-bold text-white">About</h2>
                            <p className="mt-2 text-gray-400">Some information about the user...</p>
                        </div>
                    </div>
                </div>
            </div>
            <Transition appear show={isDialogOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsDialogOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-white"
                                    >
                                        Edit Profile
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit(saveProfile)} className="mt-4">
                                        <div className="grid gap-4">
                                            <div>
                                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    {...register('fullName', { required: true })}
                                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                                {errors.fullName && <span className="text-red-500 text-sm">This field is required</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    {...register('email', { required: true })}
                                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                                {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="avatar" className="block text-sm font-medium text-gray-300">
                                                    Profile Picture
                                                </label>
                                                <input
                                                    type="file"
                                                    id="avatar"
                                                    {...register('avatar')}
                                                    className="mt-1 block w-full text-sm text-gray-900 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-300">
                                                    Cover Image
                                                </label>
                                                <input
                                                    type="file"
                                                    id="coverImage"
                                                    {...register('coverImage')}
                                                    className="mt-1 block w-full text-sm text-gray-900 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default Profile;
