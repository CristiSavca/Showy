/*
*	Written by: Jesse Han jesse.han53@myhunter.cuny.edu
*	CSCI 499 Capstone Project
*/


import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const prompt = require('prompt-sync')();

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter, collection, doc } = require('firebase-admin/firestore');
const admin = require("firebase-admin");
/*
// TODO: Replace this with a service account once the group's firestore is created.
var serviceAccount = require("");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
	// TODO replace this with the link to the db
  databaseURL: ""
});

db = getFirestore(app);
const usersCollection = db.collection('users');
*/

/*
*	Returns the object containing the reference to the user in the collection with "username".
* Returns null if this entry does not exist.
*/
function getUserByUsername(collection, username) {
	const query = await collection.where('username', '==', username).get();
	
	if (query.empty) {
		return null;
	}
	else {
		const snapshot = query.docs[0];
		return snapshot.data();
	}
}

function usernameExists(collection, username) {
	return (getUserByUsername(collection, username) != null);
}

/*
*	addUserToDatabase
* collection: Collection object from database.collection();
*	username, email, display: string
* Throws an error if the username already exists.
*/
function addUserToDatabase(collection, username, email, display) {
	
	if (!usernameExists) {
		throw new Error("This username already exists in the database.");
	}
	
	const data = {
		username: username,
		email: email,
		display: display
	}
	
	const res = await collection.add(data);
	// CONSOLE OUTPUT: REMOVE LATER
	console.log('Added ', username, ' with email ', email, ' and display name ', display, ' to database.');
}