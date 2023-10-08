/*
*	Written by: Jesse Han jesse.han53@myhunter.cuny.edu
*	CSCI 499 Capstone Project
*/

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import admin from "firebase-admin";

const prompt = require('prompt-sync')();

const serviceAccount = require("D:/Downloads/showy-92cc7-firebase-adminsdk-g3h0s-dc80e19b7c.json");
const databaseURL = "https://showy-92cc7-default-rtdb.firebaseio.com/";

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
	// TODO replace this with the link to the db
  databaseURL: databaseURL
});

const db = getFirestore(app);
const usersCollection = db.collection('users');
const forumCollection = db.collection('forum');

/*
*	Returns the object containing the reference to the user in the collection with "username".
* Returns null if this entry does not exist.
*/
async function getUserByUsername(username) {
	const query = await usersCollection.where('username', '==', username).get();
	
	if (query.docs.empty) {
		return null;
	}
	else {
		const snapshot = query.docs[0];
		return snapshot;
	}
}

async function usernameExists(username) {
	const result = (await getUserByUsername(username) != null);
	return result;
}

/*
*	addUserToDatabase
*	username, email, display: string
* Throws an error if the username already exists.
*/
async function addUserToDatabase(username, email, display) {
	
	if (!usernameExists) {
		throw new Error("This username already exists in the database.");
	}
	
	if (!allowableUsername) {
		throw new Error("This name is not alphanumeric!");
	}
	
	const data = {
		username: username,
		email: email,
		display: display
	}
	
	const res = await usersCollection.add(data);
	const newUser = usersCollection.doc(res.id);
	const amendment = await newUser.update({id: res.id});
	// TODO CONSOLE OUTPUT: REMOVE LATER
	console.log('Added ', username, ' with email ', email, ' and display name ', display, ' to database. ID:', res.id);
}

function allowableUsername(str) {
  var code, i;
  for (i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

async function makePost(poster, title, body) {
	
	const post = {
		poster: poster,
		title: title,
		body: body,
		likes: 0
	}
	
	const res = await forumCollection.add(post);
	const newPost = forumCollection.doc(res.id);
	const amendment = await newPost.update({id: res.id});
	
	console.log(`${title} by ${poster}: ${body}`);
	
}

// -------------- TESTING BELOW -----------

var user = "";
var currentId = "";

var repeat = true;
while (repeat) {
	var userInput = prompt("(a)ccount, (l)og in, (p)ost, (e)xit: ");
	
	// CHECK ACCOUNT INFO
	if (userInput == "a") {
		if (currentId == "") {
			console.log("Not logged into any account.");
		}
		else {
			console.log("Logged into " + user + " with ID " + currentId);
		}
	}
	
	// LOG IN (or register if the username is not in the database)
	if (userInput == "l") {
		user = prompt("Enter username: ");
		if (allowableUsername(user)) {
			const exist = await usernameExists(user);
			if (exist) {
				console.log ("Username exists! Logging in...");
				const x = await getUserByUsername(user)
				var y = x._fieldsProto;
				
				currentId = y.id.stringValue;
			}
			else {
				var email = prompt("Username does not exist, please enter email to create new account: ");
				var display = prompt("Display Name: ");
				
				await addUserToDatabase(user, email, display);
				const currentUser = await getUserByUsername(user);
				currentId = currentUser._fieldsProto.id.stringValue;
			}
		}
		else {
			console.log("Invalid username!");
		}
	}
	
	// MAKE A POST FROM THE USER
	if (userInput == "p") {
		if (user == "" || currentId == "") {
			console.log("Not logged in!");
		}
		else {
			const title = prompt("Title of post: ");
			const body = prompt("Body of post: ");
			
			await makePost(user, title, body);
		}
	}
	
	
	// EXIT
	if (userInput == "e") {
		userInput = prompt("Exit? y/n: ");
		if (userInput == "y") {
			repeat = false;
		}
	}
}