import React from "react";
import FeedPosts from "../components/FeedComponents/FeedPosts";
import useFetchData from "../components/FeedComponents/useFetchData";

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

            <FeedPosts backendData={backendData} />
        </div>
    );
};
 
export default Feed;