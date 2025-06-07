"use client";

import { useState } from "react";

type UserProfileProps = {
  params: { id: string };
  userData?: {
    username?: string;
    email?: string;
    bio?: string;
    avatarUrl?: string;
    joined?: string;
    followers?: number;
    following?: number;
  };
};

export default function UserProfile({ params, userData }: UserProfileProps) {
  const initialFollowers = userData?.followers ?? 100;
  const initialFollowing = userData?.following ?? 50;

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(initialFollowers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleFollow = () => {
    setFollowerCount((prev) => (isFollowing ? Math.max(prev - 1, 0) : prev + 1));
    setIsFollowing(!isFollowing);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const sendMessage = () => {
    if (!message.trim()) {
      alert("Message can't be empty!");
      return;
    }
    alert(`Message sent to ${userData?.username || params.id}:\n\n${message}`);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_4px_30px_rgba(0,0,0,0.6)] text-white transition-all">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              userData?.avatarUrl ||
              `https://api.dicebear.com/7.x/adventurer/svg?seed=${params.id}`
            }
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white/20 mb-4 shadow-lg"
          />
          <h1 className="text-3xl font-bold mb-1">{userData?.username || params.id}</h1>
          <p className="text-sm text-gray-400">User ID: {params.id}</p>
        </div>

        {/* Bio */}
        <p className="text-center text-gray-300 mb-6 italic">
          {userData?.bio || "This user hasn't written a bio yet."}
        </p>

        {/* Stats */}
        <div className="flex justify-around mb-8">
          <div className="text-center">
            <p className="text-xl font-bold">{followerCount}</p>
            <p className="text-gray-400 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{userData?.following ?? initialFollowing}</p>
            <p className="text-gray-400 text-sm">Following</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{userData?.joined || "—"}</p>
            <p className="text-gray-400 text-sm">Joined</p>
          </div>
        </div>

        {/* Contact & Actions */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-semibold mb-1 text-lg">Contact</h2>
            <p className="text-gray-300">{userData?.email || `${params.id}@email.com`}</p>
          </div>

          {/* Follow Button */}
          <button
            onClick={toggleFollow}
            className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${
              isFollowing
                ? "bg-gray-700 text-gray-300 border border-gray-500 hover:bg-gray-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isFollowing ? "Following ✓" : "Follow"}
          </button>

          {/* Message Button */}
          <button
            onClick={openModal}
            className="w-full border border-indigo-600 hover:border-indigo-500 rounded-lg py-2 font-semibold text-indigo-400 hover:text-indigo-300 transition duration-300"
          >
            Message
          </button>
        </div>
      </div>

      {/* Message Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-md bg-gray-900 rounded-xl p-6 shadow-lg text-white">
            <h3 className="text-xl font-semibold mb-4">
              Message to {userData?.username || params.id}
            </h3>
            <textarea
              className="w-full h-32 p-3 rounded-md bg-gray-800 border border-gray-700 text-white resize-none focus:outline-indigo-500"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
