import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { getPostData } from '../store/postSlice';
import { getAllPosts } from '../features/getAllPosts.js';
function AllPosts() {
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const postStore = useSelector((state) => state.post_store.posts);
   console.log(postStore);
   const fetchPosts = async() => {
    try {
        const postStore = await getAllPosts()
        //console.log(postStore);
        if(postStore){
            setPosts(postStore)
        }
    } catch (error) {
        throw "error while fetching  posts"
    }
   }
   useEffect(() => {
    fetchPosts();
}, []); 

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

export default AllPosts
