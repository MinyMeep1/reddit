"use client";


import React from 'react';

import {useRouter} from 'next/navigation';


export default function Navbar() {

    const router = useRouter();

    return (
        <div className='bg-gray-800 p-5'>
            <nav className='flex items-center justify-between'>
                <h1 className='text-white text-2xl'>Reddit</h1>
                <ul className='flex space-x-5  mx-auto'>
                    <li className='nav-item text-white' onClick={ () => router.push('/timeline')}>Timeline</li>
                    <li className='nav-item text-white' onClick={ () => router.push('/subreddits')}>Subreddits</li>
                    <li className='nav-item text-white' onClick={ () => router.push('/profile')}>Profile</li>
                    <li className='nav-item text-white' onClick={ () => router.push('/login')}>Login</li>
                    <li className='nav-item text-white' onClick={ () => router.push('/signup')}>Sign Up</li>
                </ul>
            </nav>
        </div>
    );
}
