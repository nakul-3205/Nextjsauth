"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowRight, LogOut, User } from "lucide-react"; // Optional: Install `lucide-react`

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("nothing");

  const logout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
      setError("Something went wrong, try again.");
      toast.error("Something went wrong, try again.");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res,res.data);
      const userId = res.data.data._id;

      setData(res.data.data._id);
      router.push(`/profile/${userId}`);
      toast.success("User data fetched ");
    } catch (err) {
      toast.error("Couldn't fetch user details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-6 py-12 font-sans">
      {/* Top Controls */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <button
          onClick={logout}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-900 flex items-center gap-2 transition rounded px-4 py-2 font-semibold shadow"
        >
          <LogOut size={18} />
          {loading ? "Logging out..." : "Logout"}
        </button>

        <button
          onClick={getUserDetails}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition rounded px-4 py-2 font-semibold shadow flex items-center gap-2"
        >
          <User size={18} />
          Get User Profile
        </button>
      </div>

      {error && (
        <p className="max-w-4xl mx-auto text-red-500 mb-4 text-sm">{error}</p>
      )}

      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h2 className="text-md text-neutral-400">User ID:</h2>
        {data === "nothing" ? (
          <p className="text-sm text-neutral-500">No user data yet.</p>
        ) : (
          <Link
            href={`/profile/${data}`}
            className="inline-flex items-center gap-1 text-blue-400 hover:underline hover:text-blue-300 text-sm font-medium"
          >
            Go to /profile/{data} <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto bg-[#161616] p-8 rounded-xl border border-neutral-800 shadow-md">
        <h1 className="text-3xl font-bold mb-4 border-b border-neutral-700 pb-2">
          Mapping the Modern Stack: AI, ML, Data Science & SaaS
        </h1>

        <p className="text-neutral-400 text-sm mb-6">
          Published: June 2025 · Category: Emerging Tech & Systems
        </p>

        <p className="mb-6 leading-relaxed text-neutral-300">
          From pattern recognition to predictive analytics, the convergence of
          Artificial Intelligence (AI), Machine Learning (ML), and Data Science
          (DS) is reshaping modern SaaS products. This article explores how
          these technologies interact to create smarter, scalable platforms.
        </p>

        <SectionTitle title="AI, ML & DS — What’s the Difference?" />
        <ul className="list-disc list-inside text-neutral-300 space-y-1 mb-6">
          <li><strong>AI</strong> enables machines to simulate human intelligence.</li>
          <li><strong>ML</strong> is a subset of AI that learns from data.</li>
          <li><strong>Data Science</strong> extracts insights from data using both AI and stats.</li>
        </ul>

        <SectionTitle title="SaaS Meets Intelligence" />
        <p className="text-neutral-300 mb-4">
          SaaS platforms increasingly embed AI/ML for real-time personalization, automation, and forecasting.
        </p>
        <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
          <li>CRM tools using NLP to auto-categorize leads</li>
          <li>Revenue forecasting via time-series models</li>
          <li>Adaptive pricing engines powered by ML</li>
        </ul>

        <SectionTitle title="Tech Stack for AI/ML-Powered SaaS" />
        <ul className="list-decimal list-inside text-neutral-300 space-y-1 mb-6">
          <li>Frontend: React / Next.js + Tailwind</li>
          <li>Backend: Node.js, Express, FastAPI, Django</li>
          <li>DB: PostgreSQL, MongoDB, Firebase</li>
          <li>ML: TensorFlow, PyTorch, Scikit-learn APIs</li>
          <li>Deployment: Vercel, Railway, AWS, Docker</li>
        </ul>

        <SectionTitle title="Real-World Examples" />
        <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
          <li><strong>Grammarly:</strong> NLP grammar corrections</li>
          <li><strong>Notion AI:</strong> Content summarization</li>
          <li><strong>HubSpot:</strong> AI lead scoring</li>
        </ul>

        <SectionTitle title="What’s Next?" />
        <ul className="list-disc list-inside text-neutral-300 space-y-1 mb-6">
          <li>Self-learning algorithms</li>
          <li>Low-code AI for non-tech users</li>
          <li>Focus on ethical, explainable AI</li>
        </ul>

        <div className="mt-10 text-xs text-neutral-500 border-t border-neutral-800 pt-4 text-center">
          This article is for UI/UX demonstration only.
        </div>
      </article>
    </div>
  );
}

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-xl font-semibold mb-2 mt-6 text-white">{title}</h2>
);
