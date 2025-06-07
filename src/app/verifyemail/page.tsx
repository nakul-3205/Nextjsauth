"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function verifyEmailPage() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || "")
    console.log(token)
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
          console.log(token)


    }
  }, [token])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      {loading ? (
        <p className="text-xl font-medium">Verifying your email...</p>
      ) : verified ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-3">Email Verified ✅</h2>
          <p className="mb-4">You can now login to your account.</p>
          <Link href="/login" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-3">Verification Failed ❌</h2>
          <p className="mb-2">The token might be invalid or expired.</p>
          <Link href="/signup" className="text-blue-400 underline">Go back to Signup</Link>
        </div>
      )}
    </div>
  )
}
