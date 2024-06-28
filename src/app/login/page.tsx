"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '../../firebase/login';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email.length === 0  || password.length === 0) {
            alert("Both fields can't be empty")
            return
        }

        const result = await signInWithEmail(email, password);
        if (result.error) {
            setError(result.error);
            alert(result.error); 
        } else {
            
            router.push(`/signup`);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8">Reddit</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        className="input-field border rounded w-full py-2 px-3 text-gray-700 mb-4" 
                        type="text" 
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        className="input-field border rounded w-full py-2 px-3 text-gray-700 mb-4" 
                        type="password" 
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4" type="submit">
                        Login
                    </button>
                </form>

                <p className="have-account text-center text-gray-700">New to Reddit?</p>

                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mt-4" onClick={() => router.push('/signup')}>
                    Signup
                </button>
            </div>
        </div>
    );
}
