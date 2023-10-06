import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserPost = ({postId, username, header, postText, likes}) => {
    const [likedPost, setLikedPost] = useState(false);
    const [totalLikes, setTotalLikes] = useState(likes);

    function changeLikes() {
      if (!likedPost) { // console.log shows opposite of totalLikes compared to rendered need to check that out
        setLikedPost(true);
        setTotalLikes(totalLikes + 1);
      } else {
        setLikedPost(false);
        setTotalLikes(totalLikes - 1);
      }
    }

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
                    <th><button onClick={() => changeLikes()}>like {totalLikes}</button></th>
                    <th><button>comment</button></th>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    )
}

export default UserPost;