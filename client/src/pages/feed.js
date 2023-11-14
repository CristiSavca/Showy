// import { collection, getDocs } from "firebase/firestore";
// import { db } from '../db';
import Axios from 'axios';
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

import FeedPosts from "../components/FeedComponents/FeedPosts";

const Feed = ({currentUser}) => {
    const [postsData, setPostsData] = useState([]);

    useEffect(() => {
        async function getPostsData() {
            setPostsData(await Axios.get("http://localhost:5000/getPosts"));
            console.log(postsData);
        }

        getPostsData();
    }, []);

    return (
        <div>
            <h1>
                Welcome to the feed!
            </h1>
            {currentUser && <Link to={`/posts/create-post`}>
                <button>Create post</button>
            </Link>}
            <FeedPosts postsData={postsData} />
        </div>
    );
};
 
export default Feed;