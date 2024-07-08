import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import { useNavigate,  useParams } from 'react-router-dom';
import { getCurrentPost } from "../features/getCurrentPost.js";

function EditPost() {
    const [post, setPost] = useState(null)
    const {_id} = useParams()
    const navigate = useNavigate()
    
    const fetchPost = async() => {
        try {
            const currentPost = await getCurrentPost(_id)
            if(currentPost){
                setPost(currentPost)
            }
            else {
                navigate("/");
            }
            //console.log("is in Editpost");
        } catch (error) {
            throw error?.message || "this post doesn't exists"
        }
       }
        useEffect(() => {
          fetchPost()
        }, [navigate]);
      
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost