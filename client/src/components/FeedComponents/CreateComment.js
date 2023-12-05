import { useState } from 'react';

//  add {username, commentTo} back as prop
const CreateComment = () => {
    const [comment, setComment] = useState("");
    const [completedComment, setCompletedComment] = useState("");

    // TODO REPLACE WITH DB FUNCTION for saving comment to user
    async function saveComment() {

    }

    return (
        <>
            <textarea className="comment-textarea" value={comment} onChange={e => setComment(e.target.value)} required></textarea>
            <button onClick={() => {saveComment()}}>comment</button>
        </>
    )
}

export default CreateComment;