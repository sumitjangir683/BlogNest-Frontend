import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    searchPosts: []
}

const postSlice = createSlice({
    name: "post_store",
    initialState,
    reducers: {
        getPostData: (state, action) => {
            const post= {
                    postData:action.payload
            }
            state.posts.push(post)
        },
        getSearchData: (state, action) => {
            const post= {
                    postData:action.payload
            }
            state.searchPosts.push(post)
        },
        removePost: (state, action) => {
             state.posts=state.posts.filter((eachpost) => eachpost.postData.postData._id !== action.payload)
         },
        makeEmpty: (state, action) => {
           state.posts=[]
        },
        makeSearchEmpty: (state, action) => {
            state.searchPosts=[]
         }
     }
})

export const {getPostData, removePost,makeEmpty,getSearchData,makeSearchEmpty} = postSlice.actions;

export default postSlice.reducer;