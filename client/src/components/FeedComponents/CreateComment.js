import { useState } from 'react';

const CreateComment = () => {
    const [comment, setComment] = useState("");

    function saveCommentContent(comment) {
    }

    return (
        <div>
            {/* <textarea className="whole-post-comment-textarea" value={comment} onChange={e => setComment(e.target.value)}></textarea>
            <button></button> */}
        </div>
    )
}

export default CreateComment;