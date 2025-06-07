"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";
import { set } from "mongoose";

export default function SignupPage() {
  const router=useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
      const [error, setError] = React.useState("");
  ``
  const [buttonDisabled,SetButtonDisable]=useState(false)
  const [loading,setLoading]=React.useState(false)
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const onsignup = async () => {
    setError("")
      try {
        setLoading(true)
        const resp=await axios.post("/api/users/signup",user) 
        console.log("Signup sucess",resp.data)
        router.push('/email')

      }catch(error:any){
        console.log("signup failed",error)
            setError( "Something went wrong,try changing the username or email")
  toast.error("Something went wrong,try changing the username or email" )
      }finally{
        setLoading(false)
      }
  };
   
  useEffect(()=>{
    if(isValidEmail(user.email) && user.password.length>0 && user.username.length>0){
      SetButtonDisable(false)}
      else{
        SetButtonDisable(true)
      }
  
  }
  

  
  ,[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-center text-3xl font-bold mb-6 drop-shadow-sm">
          {loading ? "Processing" : "Signup"}
        </h1>

        <label htmlFor="username" className="block font-medium mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
          className="w-full p-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="w-full p-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label htmlFor="password" className="block font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="w-full p-2 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
       {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={onsignup}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold shadow-md"
        >
          {buttonDisabled ? "All the fields are required*":"Signup"}
        </button>

        <p className="text-center mt-4 text-white/80">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Go to Login Page
          </Link>
        </p>
      </div>
    </div>
  );
}
