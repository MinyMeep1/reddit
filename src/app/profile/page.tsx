"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";
import { User } from "firebase/auth";
import { auth } from '../../firebase/firebase'; 
import Navbar from "../../components/navbar";

interface Post {
    id: string;
    title: string;
    body: string;
    time: number;
    userID: string;
    upvotes: Record<string, { userID: string; time: number }>;
    replies: Record<string, { message: string; userID: string; userName: string; time: number }>;
}

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalUpvotes, setTotalUpvotes] = useState(0);

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                router.push('/login'); 
                return;
            }

            setUser(currentUser);
            await fetchUsername(currentUser.uid);
            await fetchUserData(currentUser.uid);
        };

        checkUser();
    }, [router]);

    const fetchUsername = async (userId: string) => {
        const db = getDatabase();
        const userRef = ref(db, `Users/${userId}`);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            setUsername(userData.username);
        }
    };

    const fetchUserData = async (userId: string) => {
        const db = getDatabase();
        const subscriptionRef = ref(db, `Subreddits/csMajors/subscribed/${userId}`);
        const subscriptionSnapshot = await get(subscriptionRef);

        if (subscriptionSnapshot.exists()) {
            setIsSubscribed(true);
        } else {
            setIsSubscribed(false);
        }

        await fetchPostsAndUpvotes(userId);
    };

    const fetchPostsAndUpvotes = async (userId: string) => {
        const db = getDatabase();
        const postsRef = ref(db, 'Subreddits/csMajors/posts');
        const postsQuery = query(postsRef, orderByChild('userID'), equalTo(userId));
        const postsSnapshot = await get(postsQuery);

        if (postsSnapshot.exists()) {
            const postsData = postsSnapshot.val();
            const postsArray: Post[] = Object.keys(postsData).map((key) => ({
                id: key,
                ...postsData[key]
            }));

            setPosts(postsArray);

            const upvotesCount = postsArray.reduce((total, post) => {
                return total + (post.upvotes ? Object.keys(post.upvotes).length : 0);
            }, 0);

            setTotalUpvotes(upvotesCount);
        }
    };

    return (
        <main>

            <Navbar/>

            <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
                {user && <h1 className="text-3xl font-bold mb-8">Hello, {username || 'User'}!</h1>}
                <div className="w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">Subscribed Subreddits:</h2>
                    {isSubscribed ? (
                        <ul className="list-disc pl-5 mb-8">
                            <li>csMajors</li>
                        </ul>
                    ) : (
                        <p className="mb-8">You are not subscribed to any subreddits.</p>
                    )}
                    <h2 className="text-2xl font-bold mb-4">Your Posts:</h2>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                <p className="text-gray-700 mb-2">{post.body}</p>
                                <p className="text-gray-500">Upvotes: {post.upvotes ? Object.keys(post.upvotes).length : 0}</p>
                            </div>
                        ))
                    ) : (
                        <p>You have not made any posts yet.</p>
                    )}
                    <h2 className="text-2xl font-bold mt-8">Total Upvotes Received: {totalUpvotes}</h2>
                </div>
            </div>
        </main>
    );
}
