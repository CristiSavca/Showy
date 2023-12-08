import { useState, useEffect } from 'react';
import Axios from 'axios';

const LikeButton = ({objId, currentLikes, currentUsername}) => {
    const [likedObject, setLikedObject] = useState(false); 
    const [totalLikes, setLikes] = useState(Number(currentLikes));

    useEffect(() => {
        async function getUserLike() {
            await Axios.get("http://localhost:5000/getUserLiked", {
                params: {
                    postId: objId,
                    username: currentUsername
                }
            }).then((response) => {
                setLikedObject(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        async function getUpdatedLikes() {
            await Axios.get("http://localhost:5000/getLikesCounter", {
                params: {
                    postId: objId
                }
            }).then((response) => {
                setLikes(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        getUserLike();
        getUpdatedLikes();
    }, []);

    async function dislike() {
        await Axios.post("http://localhost:5000/removeLike", {
            params: {
                postId: objId,
                username: currentUsername
            }
        }).then(() => {
            setLikedObject(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function like() {
        await Axios.post("http://localhost:5000/addLike", {
            params: {
                postId: objId,
                username: currentUsername
            }
        }).then(() => {
            setLikedObject(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    function clickLike() {
        if (currentUsername === "") {
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
            <button onClick={() => {clickLike()}}>{likedObject ? "Unlike " : "Like "} {totalLikes}</button>
        </>
    )
}

export default LikeButton;