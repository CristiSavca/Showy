import { useState } from 'react';

import CreateComment from './CreateComment';
import LikeButton from './LikeButton';
import CommentsDisplay from "./CommentsDisplay";

const Comment = ({username, commentText, likes, commentId, replies}) => {
    const [clickedReply, setClickedReply] = useState(false);

    // Display editable comment box or reply button
    let replyContent;

    if (!clickedReply) {
        replyContent = <button onClick={() => {setClickedReply(true)}}>reply</button>
    } else {
        replyContent = <>
            <CreateComment />
            <button onClick={() => {setClickedReply(false)}}>cancel</button>
        </>
    }
    
    return (
        <div className="comment">
            <>
                <strong>{username}</strong>
                <p>{commentText}</p>
                <LikeButton currentLikes={likes} /> { /* TODO add id prop to like button */}
            </>
            <>
                {replyContent}
            </>
            <>
                <CommentsDisplay commentsData={replies}/>
            </>
        </div>
    )
}

export default Comment;