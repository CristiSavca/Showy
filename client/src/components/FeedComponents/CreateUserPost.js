
// TODO
// Rename css div

import Axios from 'axios';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

const CreateUserPost = () => {
    const [username, setUsername] = useState(null);
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [createdPost, setCreatedPost] = useState(false);

    const userNameId = useSelector((state) => state.saveUsername.usernameId);


    useEffect(() => {
        async function getUsername() {
            await Axios.get("http://localhost:5000/getUsername", {
                params: {
                    uid: userNameId
                }
            }).then((response) => {
                //dispatch(saveUsername(response.data));
                setUsername(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        clearPost();
        if (userNameId !== "") { 
            getUsername();
        } else {
            clearPost();
        }
    }, [userNameId]);

    function checkPost() {
        if (header === "" || body === "") {
            alert("Please fill out post first.");
        } else {
            createPost();
        }
    }
    
    async function createPost() {
        await Axios.post('http://localhost:5000/createPost', {
            username: username,
            header: header,
            body: body,
        })
        .then((response) => {
            setCreatedPost(response);
            console.log(response.status);
        }).catch((error) => {
            console.log(error);
        });
    }

    function clearPost() {
        setUsername(null);
        setHeader("");
        setBody("");
    }

    return (
        <div className="post-box">
            {username && <p>Username: {username}</p>}
            <label>Header:</label> 
            <textarea className="header" value={header} onChange={e => setHeader(e.target.value)} required />
            <div className="post-content">
                <label>Text:</label> 
                <textarea className="userText" value={body} onChange={e => setBody(e.target.value)} required />
            </div>
            <div className="bottom-content">
                {userNameId === "" ? <Link to={'/feed'}><button>return to feed, you can't post at this time</button></Link> : 
                    <>
                        <Link to={'/feed'}><button onClick={() => checkPost()}>post</button></Link> 
                        <Link to={'/feed'}><button onClick={() => clearPost()}>cancel</button></Link>
                    </>}
            </div>
        </div>
    )
}

export default CreateUserPost;