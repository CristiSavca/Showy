
const Comment = ({username, commentText, likes, commentId}) => {
    return (
        <div className="comment">
            <p>{commentId}</p>
            <p>{username}</p>
            <p>{commentText}</p>
            <p>{likes}</p>
        </div>
    )
}

export default Comment;