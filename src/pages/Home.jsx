import React, {useEffect, useState} from 'react'
import {Container, PostCard} from '../components'
import { useDispatch, useSelector} from 'react-redux';



function Home() {
    const dispatch = useDispatch()
    const postStore = useSelector((state) => state.post_store.posts);
    //console.log(postStore);
  
    
    useEffect(() => {
        
    }, []);

    if (postStore.length === 0) {
        return (
            <div className="min-h-96 w-full py-8 mt-4 flex items-center justify-center text-center">
                <Container>
                    <div className=" flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-4xl  text-white font-bold hover:text-gray-600">
                                Login to read Blogs
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
        <Container>
        <div className='flex flex-wrap'>
                    {postStore.map((post) => (
                        <div key={post.postData.postData._id} className='p-4 w-1/3'>
                            <PostCard {...post.postData.postData} />
                        </div>
                    ))}
                </div>
        </Container>
    </div>
    )
}

export default Home