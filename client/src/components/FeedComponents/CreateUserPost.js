import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CreateUserPost = () => {
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");

    const userNameId = useSelector((state) => state.saveUsername.usernameId);

    useEffect(() => {
        clearPost();
    }, []);

    function checkPost() {
        if (header === "" || body === "") {
            alert("Please fill out post first.");
            return;
        }

        async function createPost() {
            await Axios.post('http://localhost:5000/createPost', {
                username: userNameId,
                header: header,
                body: body,
            })
            .then((response) => {
                console.log(response.status);
                alert("Successful post!");
            }).catch((error) => {
                console.log(error);
            });
        }
            
        createPost();
        clearPost();
    }
    
    function clearPost() {
        setHeader("");
        setBody("");
    }

    return (
        <div className="post-box">
            {userNameId === "" ? <p>Loading...</p> : <p>Username ID: {userNameId}</p>}
            <textarea className="header" value={header} onChange={e => setHeader(e.target.value)} placeholder="Header" />
            <div className="post-content">
                <textarea className="userText" value={body} onChange={e => setBody(e.target.value)} placeholder="Body" />
            </div>
            <div className="bottom-content">
                {userNameId === "" ? 
                    <Link to={'/feed'}><button>return to feed, you can't post at this time</button></Link> 
                    : <>
                        <button onClick={() => checkPost()}>post</button>
                        <Link to={'/feed'}><button onClick={() => clearPost()}>cancel</button></Link>
                    </>
                }

                <Link to={'/feed'}><button>return to feed</button></Link>
            </div>
        </div>
    )
}

export default CreateUserPost;