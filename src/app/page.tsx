"use client";

import Navbar from "../components/navbar";

export default function Home() {
    return (
        <main className="">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Reddit</h1>
                <h2 className="text-2xl text-gray-600 mb-6 text-center">
                    Make sure to sign up to subscribe and make posts on the website
                </h2>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    onClick={() => window.location.href = '/signup'}
                >
                    Sign Up Now
                </button>
            </div>
        </main>
    );
}
