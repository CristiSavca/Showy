import { useState } from 'react';

//  add {username, commentTo} back as prop
const CreateComment = () => {
    const [comment, setComment] = useState("");
    const [completedComment, setCompletedComment] = useState("");

    // TODO REPLACE WITH DB FUNCTION for saving comment to user
    async function saveComment() {
        // setCompletedComment(comment);

        // if (completedComment !== "") {
        //     try {
        //         const docRef = await setDoc(collection(db, "posts"), {
        //             username: username, 
        //             commentText: completedComment,
        //             likes: 0,
        //             replies: [],
        //             key: username + "-" + 8, // FIX the key
        //             commentTo: commentTo
        //         });
        //         console.log("Document written with ID: ", docRef.id);
        //       } catch {
    
        //       }
        // }
    }

    return (
        <>
            <textarea className="comment-textarea" value={comment} onChange={e => setComment(e.target.value)} required></textarea>
            <button onClick={() => {saveComment()}}>comment</button>
        </>
    )
}

export default CreateComment;