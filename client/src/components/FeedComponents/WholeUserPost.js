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
    const [textContent, setTextContent] = useState("");

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

    const commentsData = [
      {
        "username": "Person2",
        "commentText": "Hello everyone",
        "likes": 0,
        "replies": [
          {
            "username": "Person1",
            "commentText": "This is a reply",
            "likes": 0,
            "replies": [
              {
                "username": "Person98989",
                "commentText": "This is a reply to a reply",
                "likes": 0,
                "replies": []
              }
            ]
          },
          {
            "username": "Person8",
            "commentText": "This is a reply112112",
            "likes": 0,
            "replies": []
          },
          {
            "username": "Person1",
            "commentText": "This is a reply 9898989 ",
            "likes": 0,
            "replies": []
          }
        ]
      },
      {
        "username": "Person3",
        "commentText": "Hello world",
        "likes": 0,
        "replies": []
      }
    ]

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
        
        {/* NEED TO UPDATE COMMENTS */}
        <div className="whole-post-comment-box">
          <CreateComment />
        </div>
        <>
          <CommentsDisplay commentsData={commentsData}/>
        </>
      </div>
    )
  }

  export default WholeUserPost;