"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDatabase, ref, push, set } from "firebase/database";
import { auth } from '../firebase/firebase'; 
import { Post } from './postdata'; 

export default function PostButton() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const user = auth.currentUser;
        
        if (!user) {
            alert('You must be logged in to post.');
            router.push('/login'); 
            return;
        }

        const db = getDatabase();
        const postsRef = ref(db, 'Subreddits/csMajors/posts');
        const newPostRef = push(postsRef);
        
        const postData: Omit<Post, 'id' | 'replies'> = {
            title: title,
            body: body,
            time: Date.now(),
            userID: user.uid,
            upvotes: {} 
        };
        
        await set(newPostRef, { ...postData, replies: {} });
        
        setTitle('');
        setBody('');
        
        router.push('/subreddit'); 
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8">Create a Post</h2>
                <form onSubmit={handlePost}>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input 
                        className="input-field border rounded w-full py-2 px-3 text-gray-700 mb-4" 
                        type="text" 
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />

                    <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">Body</label>
                    <textarea 
                        className="input-field border rounded w-full py-2 px-3 text-gray-700 mb-4" 
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)} 
                    />

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4" type="submit">
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}
