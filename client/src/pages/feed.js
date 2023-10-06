import React from "react";
import FeedPosts from './components/FeedComponents/Feed';
import useFetchData from './useFetchData';

const Feed = () => {
    const {backendData, errorMessage} = useFetchData("/posts");

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