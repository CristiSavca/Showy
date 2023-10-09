import CommentsDisplay from "./CommentsDisplay";

const Comment = ({username, commentText, likes, commentId, replies}) => {
    return (
        <div className="comment">
            <p>{commentId}</p>
            <p>{username}</p>
            <p>{commentText}</p>
            <p>{likes}</p>
            <div>
                <CommentsDisplay commentsData={replies}/>
            </div>
        </div>
    )
}

export default Comment;