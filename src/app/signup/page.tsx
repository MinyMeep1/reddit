"use client";

import React, { useState } from 'react';
import {useRouter} from 'next/navigation';
import { signUpWithEmail } from '../../firebase/signup';

export default function Signup() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState('');
    
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email.length === 0  || password.length === 0 || username.length === 0) {
            alert("You must enter something for all three fields.")
            return
        }
    
        const result = await signUpWithEmail(email, password, username);
        if (result.error) {
            setError(result.error);
            alert(result.error);
        } else {
    
            router.push('/login');
            
        }
    };
        


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8">Reddit</h2>

                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input 
                    className="input-field border rounded w-full py-2 px-3 text-gray-700 mb-4" 
                    type="text" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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

               
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4" onClick={handleSignup}>
                        Create Account
                    </button>
                

                <p className="have-account text-center text-gray-700">Already have an account?</p>

             
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mt-4"  onClick={ () => router.push('/login')}>
                        Login
                    </button>
                
            </div>
        </div>
    );
}
