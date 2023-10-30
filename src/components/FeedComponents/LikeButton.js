// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db } from '../../db';

import { useState } from 'react';

const LikeButton = ({currentLikes}) => { // props should be the amount of likes for the post / comment and if it was liked before // also need id of comment or post
    const [likedObject, setLikedObject] = useState(false); // todo use props for liked object
    const [totalLikes, setLike] = useState(currentLikes); // todo use props for likes

    function clickLike() { // need to consider saving who liked the post save post id that was liked and liked state
        if (likedObject) { // console.log shows opposite of totalLikes compared to rendered need to check that out
            setLike(totalLikes - 1);
            setLikedObject(false);
        } else if (!likedObject) {
            setLike(totalLikes + 1);
            setLikedObject(true);
        }
    }
    return (
        <div>
            <button onClick={() => {clickLike()}}>Like {totalLikes}</button>
        </div>
    )
}

export default LikeButton;