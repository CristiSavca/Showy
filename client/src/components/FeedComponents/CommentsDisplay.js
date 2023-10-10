import Comment from "./Comment";

const CommentsDisplay = ({commentsData}) => {
    return(
        <div className="comments-display">
            {(typeof commentsData === "undefined") ? (<p>Loading...</p>)
            :(commentsData.map((comment) => <Comment key={comment.key}
                                                  username={comment.username} 
                                                      commentText={comment.commentText} 
                                                        likes={comment.likes} 
                                                            commentId={comment.key}
                                                                replies={comment.replies}/>)
          )}
        </div>
    )
}

export default CommentsDisplay;