import React, {useEffect} from 'react'
import {Container, PostCard} from '../components'
import { useSelector,useDispatch} from 'react-redux';

export default function MyPosts() {
   const dispatch = useDispatch()
   const user=useSelector((state) => state.auth.userData);
    const postStore = useSelector((state) => state.post_store.posts);
    // console.log(postStore);
    // console.log(user);
    if (!user) {
        return <div className='flex justify-center'>Loading...</div>; 
    }
    const myId=user._id;
    const myPosts = postStore.filter(post => post.postData.postData.owner=== myId);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {myPosts.length > 0 ? (
                        myPosts.map(post => (
                            <div key={post.postData.postData._id} className='p-2 w-1/4'>
                                <PostCard {...post.postData.postData} />
                            </div>
                        ))
                    ) : (
                        <div>No posts to show</div>
                    )}
                </div>
            </Container>
        </div>
    );
}
