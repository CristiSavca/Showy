import UserPost from "./UserPost";

const FeedPosts = ({postsData, currentUsername}) => {
  return (
    <>     
      {postsData === null ? <p>Loading...</p>
        : postsData.map((post) => <UserPost key={post.postId}
                                              username={post.username} 
                                                header={post.header} 
                                                  postText={post.body} 
                                                    likes={post.likes} 
                                                      postId={post.postId}
                                                        currentUsername={currentUsername} />)
      }
    </>
  )
}

export default FeedPosts;