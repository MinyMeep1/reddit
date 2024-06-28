"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { auth } from '../../firebase/firebase'; 
import Navbar from "../../components/navbar"; 
import PostButton from "../../components/post";
import Timeline from "../../components/timeline";

export default function Subreddits() {
    const router = useRouter();
    const [showPostForm, setShowPostForm] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        checkSubscriptionStatus();
    }, []);

    const handlePostButtonClick = () => {
        setShowPostForm(!showPostForm);
    };

    const handleSubscribeButtonClick = async () => {
        const user = auth.currentUser;

        if (!user) {
            alert('You must be logged in to subscribe.');
            router.push('/login');
            return;
        }

        const db = getDatabase();
        const userId = user.uid;
        const subscriptionRef = ref(db, `Subreddits/csMajors/subscribed/${userId}`);
        const subscriptionSnapshot = await get(subscriptionRef);

        if (subscriptionSnapshot.exists()) {
            
            await remove(subscriptionRef);
            setIsSubscribed(false);
        } else {
            
            await set(subscriptionRef, {
                userID: userId,
                time: Date.now()
            });
            setIsSubscribed(true);
        }
    };

    const checkSubscriptionStatus = async () => {
        const user = auth.currentUser;

        if (!user) {
            return;
        }

        const db = getDatabase();
        const userId = user.uid;
        const subscriptionRef = ref(db, `Subreddits/csMajors/subscribed/${userId}`);
        const subscriptionSnapshot = await get(subscriptionRef);

        setIsSubscribed(subscriptionSnapshot.exists());
    };

    return (
        <main className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-3xl font-bold">r/csMajors</h1>
                <div className="mt-4">
                    <button 
                        className={`font-bold py-2 px-4 rounded mr-4 ${isSubscribed ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                        onClick={handleSubscribeButtonClick}
                    >
                        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                    <button onClick={handlePostButtonClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Post
                    </button>
                </div>
                {showPostForm && (
                    <div className="mt-8 w-full max-w-2xl">
                        <PostButton />
                    </div>
                )}
                <div className="mt-8 w-full max-w-2xl">
                    <Timeline />
                </div>
            </div>
        </main>
    );
}
