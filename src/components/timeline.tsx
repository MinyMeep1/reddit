"use client";

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, query, orderByChild, onValue, push, set, get, update } from "firebase/database";
import { useRouter } from 'next/navigation';
import { Post, Reply } from './postdata';
import { auth } from '../firebase/firebase'; 

export default function Timeline() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [replyMessages, setReplyMessages] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const db = getDatabase();
        const postsRef = ref(db, 'Subreddits/csMajors/posts');
        const postsQuery = query(postsRef, orderByChild('time'));

        onValue(postsQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const postsArray: Post[] = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));
                
                postsArray.sort((a, b) => b.time - a.time);
                setPosts(postsArray);
            } else {
                setPosts([]);
            }
        });
    }, []);

    const handleReplyChange = (postId: string, message: string) => {
        setReplyMessages({
            ...replyMessages,
            [postId]: message
        });
    };

    const handleReplySubmit = async (e: React.FormEvent, postId: string) => {
        e.preventDefault();

        const user = auth.currentUser;

        if (!user) {
            alert('You must be logged in to reply.');
            router.push('/login');
            return;
        }

        const db = getDatabase();
        const userId = user.uid;
        const userRef = ref(db, `Users/${userId}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        if (!userData) {
            alert('User data not found.');
            return;
        }

        const userName = userData.username;

        const repliesRef = ref(db, `Subreddits/csMajors/posts/${postId}/replies`);
        const newReplyRef = push(repliesRef);

        const replyData: Omit<Reply, 'id'> = {
            message: replyMessages[postId],
            userID: userId,
            userName: userName,
            time: Date.now()
        };

        await set(newReplyRef, replyData);
        setReplyMessages({
            ...replyMessages,
            [postId]: ''
        });
    };

    const handleUpvote = async (postId: string) => {
        const user = auth.currentUser;

        if (!user) {
            alert('You must be logged in to upvote.');
            router.push('/login'); 
            return;
        }

        const db = getDatabase();
        const userId = user.uid;
        const upvoteRef = ref(db, `Subreddits/csMajors/posts/${postId}/upvotes/${userId}`);
        const upvoteSnapshot = await get(upvoteRef);

        if (upvoteSnapshot.exists()) {
            
            await set(upvoteRef, null);
        } else {
           
            await set(upvoteRef, {
                userID: userId,
                time: Date.now()
            });
        }
    };

    return (
        <div className="w-full">
            {posts.length === 0 ? (
                <h2 className="text-center text-gray-700">No posts in this subreddit</h2>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-gray-700 mb-4">{post.body}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                            onClick={() => handleUpvote(post.id)}
                        >
                            Upvote ({post.upvotes ? Object.keys(post.upvotes).length : 0})
                        </button>
                        <h4 className="text-lg font-bold mb-2">Replies:</h4>
                        <div className="mb-4">
                            {post.replies && Object.keys(post.replies).map(replyId => {
                                const reply = post.replies[replyId];
                                return (
                                    <div key={replyId} className="bg-gray-200 p-2 rounded-lg mb-2">
                                        <p><strong>{reply.userName}</strong> ({new Date(reply.time).toLocaleString()}): {reply.message}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <form onSubmit={(e) => handleReplySubmit(e, post.id)}>
                            <label htmlFor="reply" className="block text-gray-700 text-sm font-bold mb-2">Reply</label>
                            <textarea
                                className="input-field border rounded w-full py-2 px-3 text-gray-700 mb-4"
                                name="reply"
                                value={replyMessages[post.id] || ''}
                                onChange={(e) => handleReplyChange(post.id, e.target.value)}
                            />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">
                                Post Reply
                            </button>
                        </form>
                    </div>
                ))
            )}
        </div>
    );
}
