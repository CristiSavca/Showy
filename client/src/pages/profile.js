import React, { useEffect, useState } from 'react';
import { useAuth, upload } from '../firebase';
import ActivityTracker from '../components/contributions';

export default function Profile() {
    // State from the second block
    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    // Photo URL logic from the second block
    const defaultPhotoURL = currentUser?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    const [photoURL, setPhotoURL] = useState(defaultPhotoURL);

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

    // Effect from the second block
    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser]);

    return (
        <div>
            <h1>Profile Page</h1>
            {/* Picture Upload */}
            <div className="fields">
                <input type="file" onChange={handleChange} />
                <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
                <img src={photoURL} alt="Avatar" className="avatar" />
            </div>

            {/* Contribution Graph */}
            <ActivityTracker />
        </div>
    );
}