import UserPost from "./UserPost";

const FeedPosts = ({postsData}) => {
    return (
        <>      
          {(typeof postsData === "undefined") ? (<p>Loading...</p>)
          :(postsData.map((post) => <UserPost key={post.postId}
                                                  username={post.username} 
                                                    header={post.header} 
                                                      postText={post.body} 
                                                        likes={post.likes} 
                                                          postId={post.postId} />)
          )}
        </>
    )
}

export default FeedPosts;