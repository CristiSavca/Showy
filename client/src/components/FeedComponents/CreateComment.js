import { useState, useEffect } from 'react';
import Axios from 'axios';

const CreateComment = ({userNameId, postId}) => {
    const [comment, setComment] = useState("");
    const [headerComment, setHeaderComment] = useState("");

    useEffect(() => {
        clearComment();
    }, []);

    function checkComment() {
        if (headerComment === "" || comment === "") {
            alert("Please fill out the comment first.");
            return;
        }

        async function createComment() {
            await Axios.post('http://localhost:5000/createComment', {
                postId: postId,
                posterId: userNameId,
                title: headerComment,
                body: comment,
            }).then((response) => {
                console.log(response.status);
            }).catch((error) => {
                console.log(error);
            });
        }
        
        createComment();
        clearComment();
    }

    function clearComment() {
        setComment("");
        setHeaderComment("");
    }

    return (
        <>
            <textarea value={headerComment} onChange={e => setHeaderComment(e.target.value)} placeholder="Header"></textarea>
            <textarea className="comment-textarea" value={comment} onChange={e => setComment(e.target.value)} placeholder="Body"></textarea>
            {userNameId === "" || userNameId === null ? 
                <button onClick={() => {alert("Log in first")}}>log in to comment</button> 
                : <button onClick={() => {checkComment()}}>comment</button>
            }
        </>
    )
}

export default CreateComment;