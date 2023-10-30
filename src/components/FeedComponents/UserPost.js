import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';

// Add link to username remember to their profile

const UserPost = ({postId, username, header, postText, likes}) => {

    return (
      <div className="post-box">
        <p>{username}</p>
        <Link to={`/posts/${postId}`}><h2>{header}</h2></Link>
        <div className="post-content">
            <p>{postText}</p>
        </div>
        <div className="bottom-content">
            <table>
              <thead></thead>
              <tbody>
                <tr>
                    <th><LikeButton currentLikes={likes}/></th>
                    <th><Link to={`/posts/${postId}`}><button>comment</button></Link></th>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    )
}

export default UserPost;