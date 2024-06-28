"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    return (
        <div className='bg-gray-800 p-5'>
            <nav className='flex items-center justify-between'>
                <h1 className='text-white text-2xl'>Reddit</h1>
                <ul className='flex space-x-5 mx-auto'>
                    <li 
                        className='nav-item text-white cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                        onClick={() => router.push('/')}
                    >
                        Homepage
                    </li>
                    <li 
                        className='nav-item text-white cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                        onClick={() => router.push('/subreddit')}
                    >
                        Subreddits
                    </li>
                    <li 
                        className='nav-item text-white cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                        onClick={() => router.push('/profile')}
                    >
                        Profile
                    </li>
                    <li 
                        className='nav-item text-white cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </li>
                    <li 
                        className='nav-item text-white cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                        onClick={() => router.push('/signup')}
                    >
                        Sign Up
                    </li>
                </ul>
            </nav>
        </div>
    );
}
