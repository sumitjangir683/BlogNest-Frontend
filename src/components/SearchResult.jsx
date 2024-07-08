import React, {useEffect} from 'react'
import {Container, PostCard} from './index.js'
import { useSelector,useDispatch} from 'react-redux';
function SearchResult() {

    const postStore = useSelector((state) => state.post_store.searchPosts);
    console.log(postStore);
  return (
    <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {postStore.length > 0 ? (
                        postStore.map(post => (
                            <div key={post.postData.postData.postData.postData._id} className='p-2 w-1/4'>
                                <PostCard {...post.postData.postData.postData.postData} />
                            </div>
                        ))
                    ) : (
                        <p className='text-2xl text-white'>No Blogs to show</p>
                    )}
                </div>
            </Container>
        </div>
  )
}

export default SearchResult
