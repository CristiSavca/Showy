import React, {useState} from 'react';

export default function CreateUserPost() {
    
    const [username, setUsername] = useState("");
    const [header, setHeader] = useState("");
    const [userText, setUserText] = useState("");
    const [userLikes, setUserLikes] = useState(0);
    
    function handlePost() {
        console.log("handling post");
        
        const createdPost = {
            "key": username + header,
            "username": username,
            "header": header,
            "postText": userText, 
            "likes": 0
        }
    
        fetch("/posts", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(createdPost)
        }).then(
          response => response.json()
        ).then(
          data => {
            console.log("new", data);
            //setBackendData(data);
          }
        )
    }
    
    return (
        <div className="post-box">
            <label>Username:</label> <br />
            <textarea className="username" value={username} onChange={e => setUsername(e.target.value)}></textarea>
            <br />
            <label>Header:</label> <br />
            <textarea className="header" value={header} onChange={e => setHeader(e.target.value)}></textarea>
            <div className="post-content">
                <label>Text:</label> <br />
                <textarea className="userText" value={userText} onChange={e => setUserText(e.target.value)}></textarea>
            </div>
            <div className="bottom-content">
                    <button onClick={() => handlePost()}>Post</button>
            </div>
        </div>
    )
}