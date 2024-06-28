"use client";

import React from 'react';
import {useRouter} from 'next/navigation';

export default function Login() {

    const router = useRouter();

    return (
    

    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-8">Reddit</h2>

            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input 
                className="input-field border rounded w-full py-2 px-3 text-gray-700 mb-4" 
                type="text" 
                name="username" 
            />

            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
                className="input-field border rounded w-full py-2 px-3 text-gray-700 mb-4" 
                type="password" 
                name="password" 
            />

        
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4">
                    Login
                </button>
            

            <p className="have-account text-center text-gray-700">New to reddit?</p>

        
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mt-4"  onClick={ () => router.push('/signup')}>
                    Signup
                </button>
        </div>
    </div>

    );
}
