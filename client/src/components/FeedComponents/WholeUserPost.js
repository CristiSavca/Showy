import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from './useFetchData';
import UserPost from "./UserPost";

const WholeUserPost = () => {
    const {id} = useParams();

    const {backendData, errorMessage} = useFetchData("/posts/" + id);

    const [count, setCount] = useState(0);
    const [saveComment, setComment] = useState("");
    const [textContent, setTextContent] = useState("");
  
    function createNewComment(textContent) {
      setComment(textContent);
    }
  
    return (
      <div className="whole-post-box">
        <UserPost key={backendData.key}
                    username={backendData.username} 
                        header={backendData.header} 
                            postText={backendData.postText} 
                                likes={backendData.likes} postId={backendData.key}/>
        <div className="whole-post-comment-box">
          <textarea className="whole-post-comment-textarea" value={textContent} onChange={e => setTextContent(e.target.value)}></textarea>
          <button onClick={() => createNewComment(textContent)}>Comment</button>
          <p>{saveComment}</p>
        </div>
      </div>
    )
  }

  export default WholeUserPost;