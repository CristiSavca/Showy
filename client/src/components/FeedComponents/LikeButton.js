import { useState, useEffect } from 'react';
import Axios from 'axios';

const LikeButton = ({objType, objId, currentLikes, currentUsername}) => {
    const [likedObject, setLikedObject] = useState(false); 
    const [totalLikes, setLikes] = useState(Number(currentLikes));
    const [objectId, setObjectId] = useState(objId);
    const [username, setUsername] = useState(currentUsername);

    useEffect(() => {
        getUserLike();
    }, []);

    // remember that it will be used for comments as well replace post id
    async function getUpdatedLikes() {
        if (objType === "post") {
            await Axios.get("http://localhost:5000/getLikesCounter", {
                params: {
                    postId: objectId
                }
            }).then((response) => {
                setLikes(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    async function getUserLike() {
        if (objType === "post") {
            await Axios.get("http://localhost:5000/getUserLiked", {
                params: {
                    postId: objectId,
                    username: username
                }
            }).then((response) => {
                setLikedObject(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        getUpdatedLikes();
    }

    async function dislike() {
        if (objType === "post" ) {
            await Axios.post("http://localhost:5000/removeLike", {
                params: {
                    postId: objectId,
                    username: username
                }
            }).then(() => {
                setLikedObject(false);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    async function like() {
        if (objType === "post") {
            await Axios.post("http://localhost:5000/addLike", {
                params: {
                    postId: objectId,
                    username: username
                }
            }).then(() => {
                setLikedObject(true);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    function clickLike() {
        if (currentUsername === '') {
            alert("Log in first");
            return;
        }

        if (likedObject) {
            dislike();
            setLikes(totalLikes - 1);
            return;
        }
        
        if (!likedObject) {
            like();
            setLikes(totalLikes + 1);
            return;
        }
    }

    return (
        <>
            <button onClick={() => {clickLike()}}>{likedObject ? 'Unlike ' : 'Like '} {totalLikes}</button>
        </>
    )
}

export default LikeButton;