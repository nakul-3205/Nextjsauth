"use client"
import Link from "next/link"
import React from "react"
import { MailCheck } from "lucide-react"
import Cookies from "js-cookie";

export default function VerifyEmailPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-black to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 text-center shadow-lg max-w-md w-full text-white">
        <div className="flex justify-center mb-6">
          <MailCheck size={48} className="text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
        <p className="mb-6 text-white/80">
          We've sent a verification link to your email. Please check your inbox
          and click on the link to continue.
        </p>

        <Link href="/login" onClick={() => Cookies.remove("token")}>
          <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold shadow-md">
            Back to Login
          </button>
        </Link>

        <p className="mt-4 text-sm text-white/60">
          Didn't receive an email? Check your spam folder or{" "}
          <span className="underline text-indigo-400 cursor-pointer">
            resend
          </span>{" "}
          the link.
        </p>
      </div>
    </div>
  )
}
