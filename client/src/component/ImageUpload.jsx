import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ImageUpload({ getImages }) {
  const navigate=useNavigate();
  const [imageDetail, setImageDetail] = useState({
    name: '',
    url: '',
  })
  const [error, setError] = useState({
    showError: false,
    showErrorMsg: '',
  })

  const uploadImage = async () => {
    try {
      const { name, url} = imageDetail
      if (!name || !url ) {
        setError({ showError: true, showErrorMsg: 'Enter Complete Details' })
        return
      }
      setError({ showError: false, showErrorMsg: '' })

      const formData = new FormData()
      formData.append('file', url)
      formData.append('upload_preset',process.env.REACT_APP_UPLOAD_PRESET)
      formData.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
      const Imagedata = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      )
      let user = JSON.parse(localStorage.getItem('user'))
      let config = {
        headers: {
          Authorization: `Bearer ${user.meta.access_token}`,
        },
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/image/${user.data.id}`,
        { ...imageDetail,url: Imagedata.data.url},
        config,
      )
      if (response) {
        getImages()
      }
      setImageDetail({ name: '', url: '' })
      document.getElementById("image-input").value=""
    } catch (error) {
      setError({ showError: true, showErrorMsg: "Error .Try Unique Image with Unique Name"})
      console.log(error)
    }
  }

  return (
    <div className="w-full">
      <div className="mt-10 p-4 flex flex-col bg-slate-100 shadow-md gap-2 rounded">
        <div className="flex flex-col gap-2">
          <label>Image Name</label>
          <input
            type="text"
            value={imageDetail.name}
            placeholder="enter image name"
            className="border border-slate-700 p-1 rounded"
            onChange={(e) => {
              setImageDetail({ ...imageDetail, name: e.target.value })
            }}
          ></input>
          <label>Upload Image</label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            placeholder="enter image"
            onChange={(e) => {
              setImageDetail({ ...imageDetail, url:e.target.files[0] })
            }}
            className="border border-slate-700 p-1 rounded"
          ></input>
        </div>
        {error.showError && (
          <p className="text-red-700">{error.showErrorMsg}</p>
        )}
        <div className="button-classw-full mt-8">
          <button
            onClick={() => {
              uploadImage()
            }}
            className="w-full bg-[#2563eb]  hover:bg-[#1d4ed8]  py-2 px-6 rounded text-white"
          >
            Upload Image
          </button>
        </div>
        <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="w-full bg-red-600 hover:bg-red-800  py-2 px-6 rounded text-white"
          >
            Logout
          </button>
      </div>
    </div>
  )
}

export default ImageUpload
