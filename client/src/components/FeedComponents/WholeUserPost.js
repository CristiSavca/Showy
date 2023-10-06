import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useFetchData from './useFetchData';

export default function WholeUserPost() {
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
        <p>{backendData.username}</p>
        <h2>{backendData.header}</h2>
        <div className="whole-post-content">
          <p>{backendData.postText} </p>
        </div>
        <div className="whole-post-bottom-content">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <th><button onClick={() => setCount(1)}>like {backendData.likes}</button></th>
                <th><button>comment</button></th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="whole-post-comment-box">
          <textarea className="whole-post-comment-textarea" value={textContent} onChange={e => setTextContent(e.target.value)}></textarea>
          <button onClick={() => createNewComment(textContent)}>Comment</button>
          <p>{saveComment}</p>
        </div>
      </div>
    )
  }