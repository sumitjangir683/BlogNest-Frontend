import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch,useSelector } from 'react-redux';
import Input from './Input';
import Button from './Button';
import { getSearchData,makeSearchEmpty } from '../store/postSlice';
import { useNavigate } from 'react-router-dom';

function Search() {
    const { register, handleSubmit } = useForm();
    const postStore = useSelector((state) => state.post_store.posts);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchSubmit = async(data) => {
      dispatch(makeSearchEmpty())
   //console.log(postStore);
    const filteredPosts = postStore.filter((post) =>
      post.postData.postData.title.toLowerCase().includes(data.searchQuery.toLowerCase())
      )
     // console.log(filteredPosts);
      filteredPosts.forEach((post) => {
        dispatch(getSearchData({ postData: post }));
    })
    navigate(`/searchResult/${data.searchQuery}`)
    }
  return (
    <form onSubmit={handleSubmit(searchSubmit)} className=" flex items-center justify-center m-2">
    <div className="flex items-center">
        <input
            type="search"
            placeholder="Search here..."
            className="w-full p-2 rounded-l-md border border-gray-300 text-black"
            {...register("searchQuery", { required: true })}
        />
        <button type="submit" className="p-2 px-4 bg-slate-500 hover:bg-slate-700 text-white rounded-r-md">
            Search
        </button>
    </div>
</form>

  )
}

export default Search
