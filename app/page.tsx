"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Welcome to the Vonway System
      </h1>

      <button
        onClick={handleRedirect}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
