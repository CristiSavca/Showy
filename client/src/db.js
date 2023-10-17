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

/*
*	Returns the object containing to the user based on the id supplied.
* Returns null if an entry matching that ID does not exist.
*/
async function getUserById(id) {
	const query = await usersCollection.where('id', '==', id).get();
	
	if (query.docs.empty) {
		return null;
	}
	else {
		const snapshot = query.docs[0];
		return snapshot;
	}
}

/*
*	Returns username with the associated id. If the id is invalid, returns null.
*/
async function getUsernameFromId(id) {
	const out = await getUserById(id);
	
	if (out == null) {
		return null;
	}
	else {
		return out._fieldsProto.username.stringValue;
	}
}

// Like getUsernameFromId, but gets the ID based on username.
async function getIdFromUsername(username) {
	const out = await getUserByUsername(username);
	
	if (out == null) {
		return null;
	}
	else {
		return out._fieldsProto.id.stringValue;
	}
}

// Returns true/false if the username exists in the database.
async function usernameTaken(username) {
	const result = (await getUserByUsername(username) != null);
	return result;
}

/*
*	username, email, display: string
* Returns false if the username already exists, or is not in the correct format (currently just alphanumeric)
*/
async function addUserToDatabase(username, email, display) {
	
	if (usernameTaken(username) || !allowableUsername(username)) {
		return false;
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
	return true;
}

/*
*	Returns false if new username is taken
* Returns true when successful
*/
async function changeUsername(id, newUser) {
	const duplicateUsername = await usernameTaken(newUser);
	if (duplicateUsername) {
		return false;
	}
	else {
		const usernameUpdate = usersCollection.doc(id);
		const res = await usernameUpdate.update({username: newUser});
		return true;
	}

}

/*
* Returns true if given string is alphanumeric, false if otherwise.
* Characters of "allowable usernames" will likely change later.
*/
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

/*
* Adds a post to the database with the given characteristics:
* Title (string)
* Body (string)
* PosterId (string): The user ID that posted this. This will be converted into their ID when the post is made, to track username changes.
* The time posted and likes will be assigned automatically.
*/
async function makePost(posterId, title, body) {
	
	const timestamp = admin.firestore.Timestamp.now();
	const jsTimestamp = timestamp.toDate();
	
	const post = {
		title: title,
		body: body,
		likes: 0,
		poster_id: posterId,
		posted: timestamp
	}
	
	const res = await forumCollection.add(post);
	const newPost = forumCollection.doc(res.id);
	const amendment = await newPost.update({id: res.id});
	
	console.log(`${title} by user with ID: ${posterId} at ${jsTimestamp}: `);
	console.log(`${body}`);
	
}

/*
*	Returns an array consisting of documents from the forum database depending on specifications. Returns null if none can be found.
* filter: A filter variable to apply. This is the field that the filter will be based on.
* filterQuery: The value of the filter that must match.
* orderBy: The name of a field within a post to sort the results by.
* order: "desc" or "asc" only. Default "desc"
* x: Default -1, meaning no limit. X is the number of posts at maximum that will be given in the returned array.
*/
async function getPostsFilteredSorted(filter, filterQuery, orderBy, order = "desc", x = -1) {
	var query;
	if (x >= 0) {
		query = await forumCollection.where(filter, '==', filterQuery).orderBy(orderBy, order).limit(x).get();
	}
	else {
		query = await forumCollection.where(filter, '==', filterQuery).orderBy(orderBy, order).get();
	}
	if (query.docs.empty) {
		return null;
	}
	else {
		return query.docs;
	}
}

// Same as above just unsorted.
async function getPostsFiltered(filter, filterQuery, x = -1) {
	var query;
	if (x > 0) {
		query = await forumCollection.where(filter, '==', filterQuery).limit(x).get();
	}
	else {
		query = await forumCollection.where(filter, '==', filterQuery).get();
	}
	
	if (query.docs.empty) {
		return null;
	}
	else {
		return query.docs;
	}
}

// Same again, but unfiltered and only sorted.
async function getPostsSorted(orderBy, order = "desc", x = -1) {
	var query;
	if (x >= 0) {
		query = await forumCollection.orderBy(orderBy, order).limit(x).get();
	}
	else {
		query = await forumCollection.orderBy(orderBy, order).get();
	}
	
	if (query.docs.empty) {
		return null;
	}
	else {
		return query.docs;
	}
}

// -------------- TESTING BELOW -----------

var user = "";
var currentId = "";

var repeat = true;
while (repeat) {
	var userInput = prompt("(a)ccount, (l)og in, (c)hange username, (p)ost, (g)et posts, (e)xit: ");
	
	// CHECK ACCOUNT INFO
	if (userInput == "a") {
		if (currentId == "") {
			console.log("Not logged into any account.");
		}
		else {
			console.log(`Logged into ${user} with user ID ${currentId}`);
		}
	}
	
	// LOG IN (or register if the username is not in the database)
	if (userInput == "l") {
		user = prompt("Enter username: ");
		if (allowableUsername(user)) {
			const exist = await usernameTaken(user);
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
			
			await makePost(currentId, title, body);
		}
	}
	
	if (userInput == "c") {
		if (user == "" || currentId == "") {
			console.log("Not logged in!");
		}
		else {
			console.log(`Logged into ${user} with user ID ${currentId}`);
			const newUsername = prompt("Enter new username: ");
			
			var result = await changeUsername(currentId, newUsername);
			
			if (result) {
				console.log("Successful change!");
				user = newUsername;
			}
			else {
				console.log("Something wrong happened (username taken?)");
			}
		}
	}
	
	if (userInput == "g") {
		var usernameSearch = prompt("Enter username to get posts from: ");
		usernameSearch = await getIdFromUsername(usernameSearch);
		
		const posts = await getPostsFiltered("poster_id", usernameSearch, 10);
		
		for (var i = 0; i < posts.length; i ++) {
			const currentPost = posts[i]._fieldsProto;
			const currentPostUser = await getUserById(currentPost.poster_id.stringValue);
			const posterUsername = currentPostUser._fieldsProto.username.stringValue;
			console.log(currentPost.title.stringValue + " posted by: " + posterUsername + " - " + currentPost.body.stringValue);
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