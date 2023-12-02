import { useSelector } from 'react-redux';

import UserPost from "./UserPost";

const FeedPosts = ({postsData}) => {
  const userNameId = useSelector((state) => state.saveUsername.usernameId);

  return (
    <>      
      {(typeof postsData === "undefined") ? (<p>Loading...</p>)
        :(postsData.map((post) => <UserPost key={post.postId}
                                              username={post.username} 
                                                header={post.header} 
                                                  postText={post.body} 
                                                    likes={post.likes} 
                                                      postId={post.postId}
                                                        currentUsername={userNameId} />)
          )}
    </>
  )
}

export default FeedPosts;