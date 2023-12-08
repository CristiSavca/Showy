import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';

const UserPost = ({postId, username, header, postText, likes, currentUsername}) => {
    return (
      <div className="post-box">
        <h1>{username}</h1>
        <Link to={`/posts/${postId}`}><h2>{header}</h2></Link>
        <div className="post-content">
          <p>{postText}</p>
        </div>
        <div className="bottom-content">
            <table>
              <thead></thead>
              <tbody>
                <tr>
                    <th><LikeButton objId={postId} currentUsername={currentUsername} currentLikes={likes}/></th>
                    <th><Link to={`/posts/${postId}`}><button>comment</button></Link></th>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    )
}

export default UserPost;