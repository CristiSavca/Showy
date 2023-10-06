import React, {useState, useEffect} from 'react';
import UserPost from "./UserPost";

export default function Feed({backendData}) {
  return (
    <div>      
      {(typeof backendData.posts === "undefined") ? (<p>Loading...</p>)
      :(
        backendData.posts.map((post) => <UserPost key={post.key}
                                              username={post.username} 
                                                header={post.header} 
                                                  postText={post.postText} 
                                                    likes={post.likes} postId={post.key}/>)
      )}
    </div>
  )
}