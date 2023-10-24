import React from "react";
import { Link } from 'react-router-dom';

import FeedPosts from "../components/FeedComponents/FeedPosts";
import CreateUserPost from "../components/FeedComponents/CreateUserPost";

const Feed = () => {
    //const {backendData, errorMessage} = useFetchData("/posts");

    const backendData = {
        "posts": [
            {
                "key": "Person-What-is-the-future?",
                "username": "Person",
                "header": "What is the future?",
                "postText": "AI", 
                "likes": 0
            },
            {
                "key": "Person2-Dogs-are-good-pets", 
                "username": "Person2", 
                "header": "Dogs are good pets", 
                "postText": "Source? me", 
                "likes": 3
            },
            {
                "key": "Person3-Test", 
                "username": "Person3", 
                "header": "Test", 
                "postText": "123", 
                "likes": 20
            }
        ]
    };

    return (
        <div>
            <h1>
                Posts & stuff...
            </h1>
            <Link to={`/posts/create-post`}>
                <button>Create post</button>
            </Link>
            <FeedPosts backendData={backendData} />
        </div>
    );
};
 
export default Feed;