import Axios from 'axios';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import UserPost from "./UserPost";
import CommentsDisplay from "./CommentsDisplay";
import CreateComment from './CreateComment';

const WholeUserPost = () => {
    const { id } = useParams();

    const [postData, setPostData] = useState({});
    const [textContent, setTextContent] = useState("");

    useEffect(() => {
      async function getPostData() {
        await Axios.get("http://localhost:5000/getPost", {
          params: {
            postId: id
          }
        }).then((response) => {
          setPostData(response.data);
          console.log(response.data);
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
        {(typeof postData === "undefined") ? (<p>Loading...</p>) : 
                <UserPost key={postData.postId}
                    username={postData.username} 
                        header={postData.header} 
                            postText={postData.body} 
                                likes={postData.likes} 
                                    postId={postData.postId} />
        }

        <div className="whole-post-comment-box">
          <CreateComment /> {/* where the username is put in as a prop and id of the post */}
        </div>
        <>
          <CommentsDisplay commentsData={commentsData}/> {/* TODO NEED TO CHANGE TO postData.replies */}
        </>
      </div>
    )
  }

  export default WholeUserPost;