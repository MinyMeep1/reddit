"use client";


import React from 'react';
import {useRouter} from 'next/navigation';
import Navbar from "../navbar/navbar"; 
import Post from "../../components/post"


export default function Subreddits() {

    const router = useRouter();

    return (
        <main>
            <Navbar/>

            <Post/>

            <h1>r/csMajors</h1>
            <button>Subscribe</button>
            <button>Post</button>
        </main>
    );
}