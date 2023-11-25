
import { useState } from 'react';

const LikeButton = ({currentLikes}) => {
    const [likedObject, setLikedObject] = useState(false); 
    const [totalLikes, setLike] = useState(currentLikes);

    function clickLike() {
        if (likedObject) {

        } else if (!likedObject) {

        }
    }
    return (
        <div>
            <button onClick={() => {clickLike()}}>Like {totalLikes}</button>
        </div>
    )
}

export default LikeButton;