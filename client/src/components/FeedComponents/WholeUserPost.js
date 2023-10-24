// import { doc, getDoc } from "firebase/firestore";
// import { db } from '../../db';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import UserPost from "./UserPost";
import CommentsDisplay from "./CommentsDisplay";

const WholeUserPost = () => {
    const { id } = useParams();

    const [postData, setPostData] = useState({ // TODO EMPTY THIS LATER
      "key": "Person2-Dogs-are-good-pets", 
      "username": "Person2", 
      "header": "Dogs are good pets", 
      "postText": "Source? me", 
      "likes": 3
    });

    const [textContent, setTextContent] = useState(""); // MAKE SURE if the person is signed in they can make comments

    // async function getPostData() {
    //   const userPostDocRef = doc(db, "posts", id);
    //   const userPostDoc = await getDoc(userPostDocRef);
    //   setPostData(userPostDoc.data());
    // }

    // useEffect(() => {
    //   getPostData();
    // }, [postData]);

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
  
    function createNewComment(textContent) {

    }

    return (
      <div className="whole-post-box">
        {(typeof postData === "undefined") ? (<p>Loading...</p>) : 
                <UserPost key={postData.key}
                    username={postData.username} 
                        header={postData.header} 
                            postText={postData.postText} 
                                likes={postData.likes} 
                                    postId={postData.key} />
        }

        <div className="whole-post-comment-box">
          {/*  TODO change below to CreateComment component*/}
          <textarea className="whole-post-comment-textarea" value={textContent} onChange={e => setTextContent(e.target.value)}></textarea>
          <button onClick={() => createNewComment(textContent)}>Comment</button>
          {/* TODO if user clicks on the comment button then it should open up the comment div box */}
        </div>
        <>
          <CommentsDisplay commentsData={commentsData}/> {/* TODO NEED TO CHANGE TO postData.replies */}
        </>
      </div>
    )
  }

  export default WholeUserPost;