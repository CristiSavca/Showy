// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4MFb1SRkZHbT7u5r2SoxGdvsXxX-LyB8",
  authDomain: "showy-92cc7.firebaseapp.com",
  projectId: "showy-92cc7",
  storageBucket: "showy-92cc7.appspot.com",
  messagingSenderId: "1044921691060",
  appId: "1:1044921691060:web:cfe35f957578134e5ce0e1",
  measurementId: "G-6CE4YFVZS6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export async function upload(file, currentUser, setLoading) {
    if (!currentUser || !currentUser.uid) {
        console.error("currentUser is not available.");
        setLoading(false);
        return;
    }

    const fileRef = ref(storage, currentUser.uid + '.png');
    setLoading(true);
    
    try {
        console.log("Uploading bytes...");
        await uploadBytes(fileRef, file);
        console.log("Bytes uploaded.");

        console.log("Fetching download URL...");
        const newPhotoURL = await getDownloadURL(fileRef);
        console.log("Download URL fetched:", newPhotoURL);

        console.log("Updating profile...");
        await updateProfile(currentUser, { photoURL: newPhotoURL });
        console.log("Profile updated.");

        setLoading(false);
        alert("Uploaded file!");
        
        return newPhotoURL;
    } catch (error) {
        console.error("Upload Error:", error);
        setLoading(false);
        alert("An error occurred while uploading.");
    }
}