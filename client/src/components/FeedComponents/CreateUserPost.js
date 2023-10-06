import { useState } from 'react';

const CreateUserPost = () => {
    const [username, setUsername] = useState("");
    const [header, setHeader] = useState("");
    const [userText, setUserText] = useState("");
    
    function handlePost() {
        const createdPost = {
            "key": username + header,
            "username": username,
            "header": header,
            "postText": userText, 
            "likes": 0
        }
    
        // fetch("/posts", {
        //   method: "POST",
        //   headers: {"Content-Type": "application/json"},
        //   body: JSON.stringify(createdPost)
        // }).then(
        //   response => response.json()
        // ).then(
        //   data => {
        //     console.log("new", data);
        //     //setBackendData(data);
        //   }
        // )
        console.log(createdPost);
    }
    
    return (
        <div className="post-box">
            <label>Username:</label> 
            <br />
            <textarea className="username" value={username} onChange={e => setUsername(e.target.value)} />
            <br />
            <label>Header:</label> 
            <br />
            <textarea className="header" value={header} onChange={e => setHeader(e.target.value)} />
            <div className="post-content">
                <label>Text:</label> 
                <br />
                <textarea className="userText" value={userText} onChange={e => setUserText(e.target.value)} />
            </div>
            <div className="bottom-content">
                <button onClick={() => handlePost()}>Post</button>
            </div>
        </div>
    )
}

export default CreateUserPost;