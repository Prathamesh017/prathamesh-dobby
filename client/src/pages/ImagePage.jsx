import React, { useEffect, useState } from 'react'
import ImageUpload from '../component/ImageUpload'
import ImageList from '../component/ImageList'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ImagePage() {
  const navigate=useNavigate();
  const [user,setUser]=useState("");
  const [imgs,setImgs]=useState([]);

  const getImages = async () => {
    try {
      let user=JSON.parse(localStorage.getItem("user"));
      if(!user){
       navigate("/");
       return;
    }
    setUser(user);
      let config = {
        headers: { Authorization: `Bearer ${user.meta.access_token}` },
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/image/${user.data.id}`,
        config,
      )
      const images = response.data.content.data.images_upload
      const imageUrl=[];
      images.forEach((image) => {
        imageUrl.push({name:image.name,img:image.url})
      })
      return setImgs(imageUrl);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getImages();
  },[])
  return (
    <div className="h-screen w-screen bg-sky-700 grid grid-cols-2 gap-4 p-10">
    {user && <>
      <ImageList  images={imgs} ></ImageList>
      <ImageUpload getImages ={getImages}></ImageUpload>
    </>
      }
    </div>
  )
}

export default ImagePage
