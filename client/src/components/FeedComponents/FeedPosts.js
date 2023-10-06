import UserPost from "./UserPost";

const FeedPosts = ({backendData}) => {
    return (
        <div>      
          {(typeof backendData.posts === "undefined") ? (<p>Loading...</p>)
          :(backendData.posts.map((post) => <UserPost key={post.key}
                                                  username={post.username} 
                                                    header={post.header} 
                                                      postText={post.postText} 
                                                        likes={post.likes} postId={post.key}/>)
          )}
        </div>
    )
}

export default FeedPosts;