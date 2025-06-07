import React from "react";
import Link from "next/link";

export default function Custom() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center text-white px-6 py-12">
      <div className="max-w-xl bg-[#161616] border border-neutral-800 shadow-md rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-500">
          Unauthorized Access
        </h1>
        <p className="text-neutral-300 mb-6 text-lg">
          You need to be logged in to access the profile page.
        </p>
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded font-semibold">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}
