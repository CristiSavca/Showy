
// TODO
// Rename css div

import Axios from 'axios';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CreateUserPost = ({currentUsername}) => {
    const [username, setUsername] = useState(null);
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [createdPost, setCreatedPost] = useState(false);

    useEffect(() => {
        //setUsername(currentUsername);
        getUsername();
    }, [currentUsername]);

    async function getUsername() {
        await Axios.get("http://localhost:5000/getUsername", {
            params: {
                uid: currentUsername.uid
            }
        }).then((response) => {
            setUsername(response.data);
            console.log("hello",response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    function checkPost() {
        if (header === "" || body === "") {
            alert("Please fill out post first.");
        } else {
            createPost();
        }
    }
    
    async function createPost() {

        await Axios.post('/createPost', {
            username: username,
            header: header,
            body: body,
        })
        .then((response) => {
            setCreatedPost(response);
        }).catch((error) => {
                console.log(error);
        });

        //             username: "bob", 
        //             header: header,
        //             postText: userText,
        //             likes: 0,
        //             comments: [],
    }

    function clearPost() {
        setUsername(null);
        setHeader("");
        setBody("");
    }

    return (
        <div className="post-box">
            {<p>Posted: {createdPost}</p>}
            {username && <p>{username}</p>}
            <label>Header:</label> 
            <textarea className="header" value={header} onChange={e => setHeader(e.target.value)} required />
            <div className="post-content">
                <label>Text:</label> 
                <textarea className="userText" value={body} onChange={e => setBody(e.target.value)} required />
            </div>
            <div className="bottom-content">
                <button onClick={() => checkPost()}>post</button>
                <Link to={'/feed'}><button onClick={() => clearPost()}>cancel</button></Link>
            </div>
        </div>
    )
}

export default CreateUserPost;