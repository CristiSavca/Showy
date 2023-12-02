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

    return (
        <div>
            <h1>
                Welcome to the feed!
            </h1>
            {userNameId === '' ? <p>Sign in to create posts</p> : <Link to={`/posts/create-post`}><button>Create post</button></Link>}
            {postsData && <FeedPosts postsData={postsData} currentUsername={userNameId} />}
        </div>
    );
};
 
export default Feed;