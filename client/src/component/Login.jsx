import React from 'react'

function Login(props) {
  return (
    <div className="w-full  text-slate-900 flex justify-center">
      <div className="w-2/4 md:w-1/4 p-4 flex flex-col bg-slate-100 shadow-md gap-2 rounded">
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="text"
            placeholder="enter email"
            className="border border-slate-700 p-1 rounded"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="enter password"
            className="border border-slate-700 p-1 rounded"
          ></input>
        </div>
        <div className="button-classw-full mt-8">
          <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]  py-2 px-6 rounded text-white">
            Login
          </button>
        </div>
        <div className="flex items-center justify-between button-class mt-2">
          <span>Account Doesn't Exists?</span>
          <button className="bg-[#2563eb] hover:bg-[#1d4ed8] py-2 px-6 rounded text-white" onClick={()=>{props.setIsLogin(false)}}>
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
