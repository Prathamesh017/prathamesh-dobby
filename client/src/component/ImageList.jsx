import React, { useEffect, useState } from 'react'

function ImageList(props) {
  const [filteredImages,setFilteredImages]=useState([]);
  console.log(filteredImages);
   useEffect(()=>{
      if(props.images.length>0){
        setFilteredImages(props.images);
      }
   },[props.images])
  return (
    <div className="bg-slate-300 overflow-x-auto">
      <div className="flex w-full justify-center">
        <input
          type="text"
          placeholder="Search Image"
          className="p-2 border border-slate-700  mt-4 w-4/5"
          onChange={(e)=>{
            let filteredImages=props.images.filter((img)=>{
              return img.name.toLowerCase().startsWith(e.target.value.toLowerCase());
            })
          setFilteredImages(filteredImages);
          }}
        ></input>
      </div>
      <div className="grid grid-cols-4 gap-4 mx-4 my-2">
        {filteredImages && filteredImages.length>0 &&
          filteredImages.map((img) => {
            return (
                <div className='flex flex-col'>
                <span>{img.name}</span>
                <img src={img.img} alt="imgs" width={100}></img>
                </div>
      
            )
          })}
      </div>
    </div>
  )
}

export default ImageList
