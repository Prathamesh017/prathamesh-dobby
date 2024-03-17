import React, { useState } from 'react'
import Login from '../component/Login'
import Signup from '../component/Signup'

function LoginPage() {
  const [IsLogin ,setIsLogin]=useState(false);
  return (
    <div className="h-screen w-screen flex flex-col bg-sky-700">
      <h1 className="text-xl text-slate-200 p-4">Weldcome to Image Uploader</h1>
      <div className="w-full  container my-auto flex justify-center items-center">

      {IsLogin ?
        <Login setIsLogin={setIsLogin}></Login>:
        <Signup setIsLogin={setIsLogin}></Signup>}
      </div>
    </div>
  )
}

export default LoginPage
