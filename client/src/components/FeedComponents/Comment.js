import { useState, useEffect } from 'react';
import Axios from 'axios';

import CreateComment from './CreateComment';
import LikeButton from './LikeButton';
import CommentsDisplay from "./CommentsDisplay";

const Comment = ({username, commentHeader, commentText, likes, commentId, currentUsername}) => {
    const [clickedReply, setClickedReply] = useState(false);
    const [repliesData, setRepliesData] = useState(null);

    // Display editable comment box or reply button
    let replyContent;

    useEffect(() => {
        async function getCommentsData() {
          await Axios.get("http://localhost:5000/getComments", {
            params: {
              postId: commentId
            }
          }).then((response) => {
            setRepliesData(response.data);
          }).catch((error) => {
            console.log(error);
          });
        }
  
        getCommentsData();
    }, []);
  

    if (!clickedReply) {
        replyContent = <button onClick={() => {setClickedReply(true)}}>reply</button>
    } else {
        replyContent = <>
            <CreateComment userNameId={currentUsername} postId={commentId} />
            <button onClick={() => {setClickedReply(false)}}>cancel</button>
        </>
    }
    
    return (
        <div className="comment">
            <>
                <strong>{username}</strong>
                <p>{commentHeader}</p>
                <p>{commentText}</p>
                
                <LikeButton currentLikes={likes} objType={"post"} objId={commentId} currentUsername={currentUsername} />
            </>
            <>
                {replyContent}
            </>
            <>
                {repliesData && <CommentsDisplay commentsData={repliesData} currentUsername={currentUsername} />}
            </>
        </div>
    )
}

export default Comment;