import CommentsDisplay from "./CommentsDisplay";

const Comment = ({username, commentText, likes, commentId, replies}) => {
    return (
        <div className="comment">
            <p>{commentId}</p>
            <p>{username}</p>
            <p>{commentText}</p>
            <p>{likes}</p>
            <button>reply</button> {/* need a link to the reply as a post and then comment from there
                OR create a comment box div under the chosen comment and delete that when finished commenting*/}
            <div>
                <CommentsDisplay commentsData={replies}/>
            </div>
        </div>
    )
}

export default Comment;