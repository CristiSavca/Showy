import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserPost from "./UserPost";
import CommentsDisplay from "./CommentsDisplay";
import CreateComment from './CreateComment';

const WholeUserPost = () => {
    const { id } = useParams();

    const [postData, setPostData] = useState(null);
    const [commentsData, setCommentsData] = useState(null);

    const userNameId = useSelector((state) => state.saveUsername.usernameId);

    useEffect(() => {
      async function getPostData() {
        await Axios.get("http://localhost:5000/getPost", {
          params: {
            postId: id
          }
        }).then((response) => {
          setPostData(response.data);
        }).catch((error) => {
          console.log(error);
        });
      }

      getPostData();
    }, []);

    useEffect(() => {
      async function getCommentsData() {
        await Axios.get("http://localhost:5000/getComments", {
          params: {
            postId: id
          }
        }).then((response) => {
          setCommentsData(response.data);
        }).catch((error) => {
          console.log(error);
        });
      }

      getCommentsData();
    }, []);

    return (
      <div className="whole-post-box">
        {postData === null ? (<p>Loading...</p>) : 
                <UserPost key={postData.postId}
                    username={postData.username} 
                        header={postData.header} 
                            postText={postData.body} 
                                likes={postData.likes} 
                                    postId={postData.postId}
                                        currentUsername={userNameId} />

        }
        
        <div className="whole-post-comment-box">
          <CreateComment userNameId={userNameId} postId={id} />
        </div>
        <>
          {commentsData === null ? <p>Loading...</p> : <CommentsDisplay commentsData={commentsData} currentUsername={userNameId} />}
        </>
      </div>
    )
  }

  export default WholeUserPost;