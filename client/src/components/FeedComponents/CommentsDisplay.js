import Comment from "./Comment";

const CommentsDisplay = ({commentsData}) => {
    return(
        <div className="comments-display">
            {(typeof backendData.posts === "undefined") ? (<p>Loading...</p>)
            :(commentsData.map((comment) => <Comment key={comment.key}
                                                  username={comment.username} 
                                                      commentText={comment.postText} 
                                                        likes={comment.likes} 
                                                            commentId={comment.key}/>)
          )}
        </div>
    )
}

export default DisplayComments;