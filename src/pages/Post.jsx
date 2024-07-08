import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Container } from "../components";
import parse from "html-react-parser";
import { useSelector,useDispatch} from "react-redux";
import { removePost } from '../store/postSlice';
import { getCurrentPost } from "../features/getCurrentPost.js";
import { deletePost } from "../features/deletePost.js";

import { Button } from "../components/ui/Button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.jsx";
import { ArrowLeft, Edit, Loader, User } from "lucide-react";

export default function Post() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
     const dispatch = useDispatch()
    const { _id } = useParams()
     const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    console.log(userData._id);

   const fetchPost = async() => {
    try {
        const currentPost = await getCurrentPost(_id)
        //console.log(currentPost);
        if(currentPost){
            setPost(currentPost)
        }
        else {
            navigate("/");
        }
    } catch (error) {
        throw error?.message || "this post doesn't exists"
    }
   }
    useEffect(() => {
      fetchPost()
    }, []);
  

  const isAuthor = post && userData ? post.owner === userData._id : false;
    const deletepost = async(_id) => {

        try {
            const response = await deletePost(_id)
            console.log();
            if(response){
               console.log("post deleted successfully")
               dispatch(removePost(post._id))
               navigate("/all-posts")
            }
            else {
                navigate("/all-posts")
            }
        } catch (error) {
            throw error?.message || "this post doesn't exists"
        }
    };

    // return post ? (
    //     <div className="py-8">
    //         <Container>
    //             <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
    //                 <img
    //                     src={post.image}
    //                     alt={post.title}
    //                     className="rounded-xl"
    //                 />

    //                 {isAuthor && (
    //                     <div className="absolute right-6 top-6">
    //                         <Link to={`/edit-post/${post._id}`}>
    //                             <Button bgColor="bg-green-500" className="mr-3">
    //                                 Edit
    //                             </Button>
    //                         </Link>
    //                         <Button bgColor="bg-red-500" onClick={deletepost}>
    //                             Delete
    //                         </Button>
    //                     </div>
    //                 )}
    //             </div>
    //             <div className="w-full mb-6">
    //                 <h1 className="text-2xl font-bold">{post.title}</h1>
    //             </div>
    //             <div className="browser-css">
    //                 {parse(post.content)}
    //                 </div>
    //         </Container>
    //     </div>
    // ) : null;



    return post ? (
		<div className="w-screen max-w-5xl mx-auto my-8 p-4">
			<div className="flex mb-4 gap-4 justify-between">
				<Button
					onClick={() => navigate('/all-posts')}
					 className="flex items-center gap-1.5 w-full max-w-xs p-2 bg-white text-black rounded shadow-md hover:bg-gray-200 transition duration-200 ease-in-out"
				>
					<ArrowLeft width={16} size={16} /> Back to Posts
				</Button>
				{isAuthor && (
                    <div className="right-6 top-6">
					<Button
						onClick={() =>
							// navigate(`/edit/${post._id}`, {
							// 	state: { postData: postQuery.data },
							// })
                            navigate(`/edit-post/${post._id}`)
						}
						 className="flex items-center gap-1.5 w-full max-w-xs p-2 bg-white text-black rounded shadow-md hover:bg-gray-200 transition duration-200 ease-in-out"
					>
						<Edit className="w-4 h-4" /> Edit Post
					</Button>
                    <br></br>
                    <Button
						onClick={() => deletepost(post._id)}
						 className="flex items-center gap-1.5 w-full max-w-xs p-2 bg-white text-black rounded shadow-md hover:bg-gray-200 transition duration-200 ease-in-out"
					>
				     Delete Post
					</Button>
                    </div>
				)}
                
			</div>
			<h1 className="font-bold text-white text-3xl mb-4">
				{post.title}
			</h1>
			<div className="flex justify-between items-center mt-6 mx-4 ml-2">
				<div className="flex items-center mb-4 gap-2">
					<Avatar className="size-10 border-2 bg-white border-black">
						<AvatarImage src={userData.avatar} alt="@profileImg" />
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<Link
						to={`/profile/${userData._id}`}
						className="text-lg text-white font-medium"
					>
						{userData.fullName ? userData.fullName : "User"}
					</Link>
				</div>
				<div className="mb-6 text-gray-800 dark:text-gray-300 text-sm">
					<p>
						Created on:{" "}
						{new Date(
							post.createdAt
						).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p>
						Last updated:{" "}
						{new Date(
							post.updatedAt
						).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>
			</div>
			{post.image ? (
				<img
					src={post.image}
					alt={post.title}
					className="rounded w-full object-center object-cover mb-4"
					style={{ maxHeight: "500px" }}
				/>
			) : (
				<div
					className="rounded w-full bg-gray-200 mb-4"
					style={{ height: "500px" }}
				/>
			)}

			<div className="text-2xl text-slate-100  ">
				{post.content && parse(post.content)}
			</div>
		</div>
	) : null
}
