import Axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import FeedPosts from "../components/FeedComponents/FeedPosts";

const Feed = () => {
    const [postsData, setPostsData] = useState([]);

    const userNameId = useSelector((state) => state.saveUsername.usernameId);

    useEffect(() => {
        async function getPostsData() {
            await Axios.get("http://localhost:5000/getPosts")
            .then((response) => {
                setPostsData(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        
        getPostsData();
    }, []);

    // const postsData = { // REMOVE THIS WHEN DATABASE FUNCTIONS ARE CONNECTED
    //     "posts": [
    //         {
    //             "key": "Person-What-is-the-future?",
    //             "username": "Person",
    //             "header": "What is the future?",
    //             "postText": "AI", 
    //             "likes": 0
    //         },
    //         {
    //             "key": "Person2-Dogs-are-good-pets", 
    //             "username": "Person2", 
    //             "header": "Dogs are good pets", 
    //             "postText": "Source? me", 
    //             "likes": 3
    //         },
    //         {
    //             "key": "Person3-Test", 
    //             "username": "Person3", 
    //             "header": "Test", 
    //             "postText": "123", 
    //             "likes": 20
    //         }
    //     ]
    // };

    return (
        <div>
            <h1>
                Welcome to the feed!
            </h1>
            {userNameId === '' ? <p>Sign in to create posts</p> : <Link to={`/posts/create-post`}><button className="create-post-button">Create post</button></Link>}
            {postsData && <FeedPosts postsData={postsData} currentUsername={userNameId} />}
        </div>
    );
};
 
export default Feed;