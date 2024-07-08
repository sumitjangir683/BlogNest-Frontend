import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostData, removePost } from "../../store/postSlice";
import axios from "axios";
export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active"
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch()

    const {_id} = useParams()


    const createPost = async(data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('status', data.status);
           formData.append('image', data.image[0]);
      
            const postData = await axios.post(
              "https://blog-nest-backend.vercel.app/api/v1/post/add-post",
              formData,
              {
                withCredentials: true 
              }
            );
          // console.log(postData)
           console.log("Post created successfully");
            if(postData){
               dispatch(getPostData({ postData: postData.data.data }))
                navigate('/')
            }
            
           
        } catch (error) {
            throw error?.message || "error"
        }
    }
    const updatePost = async(data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('status', data.status);
            formData.append('image', data.image[0]);
      
            const postData = await axios.post(
              `https://blog-nest-backend-git-main-sumit-jangirs-projects-342e6e38.vercel.app/post/edit-post/${_id}`,
              formData,
              {
                withCredentials: true ,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
              }
            );
           //console.log(postData)
           
            if(postData){
                console.log(postData);
                dispatch(removePost(post._id))
                dispatch(getPostData({ postData: postData.data.data }))
               console.log("Post updated successfully");
                navigate('/all-posts')
            }
            
           
        } catch (error) {
            throw error?.message || "error"
        }
    }
 //  console.log("userdata",userData);
    const submit = async (data) => {
       // console.log("data",data);
     // console.log(post);
        if (post) {
           await updatePost(data)
        } else {
           await createPost(data)
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap m-2">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {/* {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFil
                            ePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )} */}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
