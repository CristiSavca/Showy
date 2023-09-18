import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4eA31CvlbSmjjrXAsa_Mco9yc8Atxx2E",
  authDomain: "test-464fe.firebaseapp.com",
  projectId: "test-464fe",
  storageBucket: "test-464fe.appspot.com",
  messagingSenderId: "1031268965349",
  appId: "1:1031268965349:web:c7ceff2fd24e6a32fb2d0c",
  measurementId: "G-ZNT013652Q",
	databaseURL: "https://test-464fe-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function createUser(username, email, userId) {
	set(ref(db, 'users/' + userId), {
		username: username,
		email: email
	});		
}


createUser("test","email@example.com", 1);