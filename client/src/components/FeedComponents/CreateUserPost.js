// import { collection, addDoc, setDoc } from "firebase/firestore";
// import { db } from '../../db';

import { useState } from 'react';

const CreateUserPost = ({username}) => {
    const [header, setHeader] = useState("");
    const [userText, setUserText] = useState("");
    const [datas, setDatas] = useState([]);
    
    // consider getting username here by query 
    async function addAPost() {
        // if (header !== "" && userText !== "") {
        //     try {
        //         const docRef = await addDoc(collection(db, "posts"), {
        //             username: "bob", 
        //             header: header,
        //             postText: userText,
        //             likes: 0,
        //             comments: [],
        //         });

        //         setDoc(docRef, {key: docRef.id}, {merge: true});
        //     } catch {

        //     }
        
        // }
    }

    // SEND THE USER BACK TO FEED
    function cancelPost() {
        
    }
    
    return (
        <div className="post-box">
            <p>{username}</p>
            <label>Header:</label> 
            <textarea className="header" value={header} onChange={e => setHeader(e.target.value)} required />
            <div className="post-content">
                <label>Text:</label> 
                <textarea className="userText" value={userText} onChange={e => setUserText(e.target.value)} required />
            </div>
            <div className="bottom-content">
                <button onClick={() => addAPost()}>post</button>
                <button onClick={() => cancelPost()}>cancel</button>
            </div>
        </div>
    )
}

export default CreateUserPost;