import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Skeleton } from "../components/Skeleton"

function PostCard({_id, title, image}) {
    const navigate = useNavigate()
  
  return (
    <Link to={`/post/${_id}`}>
		<div
		className="cursor-pointer pb-4 bg-gray-100 dark:bg-zinc-800 border rounded-lg mx-auto shadow-lg w-full hover:shadow-2xl transition-transform transform hover:-translate-y-1.5"
		onClick={() => navigate(`/post/${_id}`)}
	>
		{image ? (
			<img
				src={image}
				alt={title}
				className="rounded-t-lg w-full aspect-video object-center object-cover"
			/>
		) : (
			<Skeleton className="h-[150px] w-[250px] rounded-xl" />
		)}
		<div className="p-4">
			<p className="font-semibold text-xl dark:text-white">{title}</p>
		</div>
	</div>
  </Link>
	);
}


export default PostCard