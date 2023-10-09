import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from './useFetchData';
import UserPost from "./UserPost";
import CommentsDisplay from "./CommentsDisplay";

const WholeUserPost = () => {
    // const {id} = useParams();

    // const {backendData, errorMessage} = useFetchData("/posts/" + id);
    const [count, setCount] = useState(0);
    const [saveComment, setComment] = useState("");
    const [textContent, setTextContent] = useState("");

    const backendData = {
      "key": "Person2-Dogs-are-good-pets", 
      "username": "Person2", 
      "header": "Dogs are good pets", 
      "postText": "Source? me", 
      "likes": 3
    }

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
      commentsData.push({
        "username": backendData.username,
        "commentText": textContent,
        "likes": 0,
        "replies": []
      })
    }


    // useEffect(() => {
    // }, [commentsData]);

    function eraseNewComment(textContent) {
      setTextContent("");
    }

  
    return (
      <div className="whole-post-box">
        <UserPost key={backendData.key}
                    username={backendData.username} 
                        header={backendData.header} 
                            postText={backendData.postText} 
                                likes={backendData.likes} 
                                    postId={backendData.key}/>

        {/* {console.log(id)}; */}
        <div className="whole-post-comment-box">
          <textarea className="whole-post-comment-textarea" value={textContent} onChange={e => setTextContent(e.target.value)}></textarea>
          <button onClick={() => createNewComment(textContent)}>Comment</button>
          {/* remember to figure out why erasing the textarea resets the array of data given (meaning that it resets all user input in, and only leaves fixed data behind) */}
          {/* should be fixed if adding to database properly*/}
          <button onClick={() => eraseNewComment(textContent)}>Erase</button>
          {/* <p>{saveComment}</p> */}
        </div>
        <div>
          <CommentsDisplay commentsData={commentsData}/>
        </div>
      </div>
    )
  }

  export default WholeUserPost;