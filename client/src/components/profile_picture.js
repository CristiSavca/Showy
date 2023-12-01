import React, { useEffect, useState } from 'react';
import { useAuth, upload } from '../firebase';

const ProfilePic = ({ postsData }) => {
    const currentUser = useAuth();
    const defaultPhotoURL = currentUser?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    const [photoURL, setPhotoURL] = useState(defaultPhotoURL);

    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Handlers from the second block
    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    async function handleClick() {
        const newPhotoURL = await upload(photo, currentUser, setLoading);
        if (newPhotoURL) {
            setPhotoURL(newPhotoURL);
        }
    }
    return (
        <div className="fields">
            <input type="file" onChange={handleChange} />
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <img src={photoURL} alt="Avatar" className="avatar" />
        </div>
    )
}

export default ProfilePic;