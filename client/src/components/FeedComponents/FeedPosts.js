import UserPost from "./UserPost";

const FeedPosts = ({postsData}) => {
    return (
        <>      
          {(typeof postsData === "undefined") ? (<p>Loading...</p>)
          :(postsData.map((post) => <UserPost key={post.key}
                                                  username={post.username} 
                                                    header={post.header} 
                                                      postText={post.postText} 
                                                        likes={post.likes} postId={post.key} />)
          )}
        </>
    )
}

export default FeedPosts;