import { useState, useEffect } from 'react';
import Axios from 'axios';

const CreateComment = ({userNameId, postId}) => {
    const [username, setUsername] = useState();
    const [comment, setComment] = useState("");
    const [headerComment, setHeaderComment] = useState();
    //const [createdComment, setCreatedComment] = useState(false);

    useEffect(() => {
        async function getUsername() {
            await Axios.get("http://localhost:5000/getUsername", {
                params: {
                    uid: userNameId
                }
            }).then((response) => {
                setUsername(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        if (userNameId !== "") { 
            getUsername();
        }
    }, [userNameId]);


    function checkComment() {
        if (username === '') {
            alert("Log in first");
            return;
        }
        if (headerComment === "" || comment === "") {
            alert("Please fill out the comment first.");
            return;
        }
        
        createComment();
    }


    async function createComment() {
        await Axios.post('http://localhost:5000/createComment', {
            postId: postId,
            posterId: username,
            title: headerComment,
            body: comment,
        }).then((response) => {
            //setCreatedComment(response.data);
            console.log(response.status);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <textarea value={headerComment} onChange={e => setHeaderComment(e.target.value)} placeholder="Header" required></textarea>
            <textarea className="comment-textarea" value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment here" required></textarea>
            {userNameId === "" || userNameId === null ? <button onClick={() => {alert("Log in first")}}>log in to comment</button> : <button onClick={() => {checkComment()}}>comment</button>}
        </>
    )
}

export default CreateComment;