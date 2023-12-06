import Comment from "./Comment";

const CommentsDisplay = ({commentsData, currentUsername}) => {
    return(
        <div className="comments-display">
            {commentsData === null ? <p>Loading...</p>
            : commentsData.map((comment) => <Comment key={comment.commentId}
                                                  username={comment.username} 
                                                    commentHeader={comment.header}
                                                      commentText={comment.body} 
                                                        likes={comment.likes} 
                                                            commentId={comment.commentId}
                                                                    currentUsername={currentUsername} />
          )}
        </div>
    )
}

export default CommentsDisplay;