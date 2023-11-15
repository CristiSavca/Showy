/*
*	Written by: Jesse Han jesse.han53@myhunter.cuny.edu
*	CSCI 499 Capstone Project
*/

import promptSync from 'prompt-sync';
const prompt = promptSync();
import Database from "./db.js";

import { firebaseKey, firebaseURL } from "./firebase-key.js";

// -------------- TESTING BELOW -----------

var user = "";
var currentId = "";

const dbTest = new Database(firebaseKey, firebaseURL);

var repeat = true;
while (repeat) {
	var userInput = prompt("(a)ccount, (l)og in, (c)hange username, (p)ost, (g)et posts, (aa)dd user from authenticator, (ch)eck post, (lp)ike post, (e)xit: ");
	
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
		if (dbTest.allowableUsername(user)) {
			const exist = await dbTest.usernameTaken(user);
			if (exist) {
				console.log ("Username exists! Logging in...");
				const x = await dbTest.getUserByUsername(user);
				var y = x._fieldsProto;
				
				currentId = y.id.stringValue;
			}
			else {
				var email = prompt("Username does not exist, please enter email to create new account: ");
				var display = prompt("Display Name: ");
				
				await dbTest.addUserToDatabase(user, email, display);
				const currentUser = await dbTest.getUserByUsername(user);
				
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
			
			await dbTest.makePost(currentId, title, body);
		}
	}
	
	if (userInput == "c") {
		if (user == "" || currentId == "") {
			console.log("Not logged in!");
		}
		else {
			console.log(`Logged into ${user} with user ID ${currentId}`);
			const newUsername = prompt("Enter new username: ");
			
			var result = await dbTest.changeUsername(currentId, newUsername);
			
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
		usernameSearch = await dbTest.getIdFromUsername(usernameSearch);
		
		const posts = await dbTest.getPostsFiltered("poster_id", usernameSearch, 10);
		
		for (var i = 0; i < posts.length; i ++) {
			const currentPost = posts[i]._fieldsProto;
			const currentPostUser = await dbTest.getUserById(currentPost.poster_id.stringValue);
			const posterUsername = currentPostUser._fieldsProto.username.stringValue;
			console.log(currentPost.title.stringValue + " posted by: " + posterUsername + " - " + currentPost.body.stringValue);
		}
	}
	
	if (userInput == "ch") {
		const postId = prompt("Enter Post ID: ");
		const post = await dbTest.getPostById(postId);
		const post_username = await dbTest.getUsernameFromId(post._fieldsProto.poster_id.stringValue);
		
		const likes = await dbTest.getLikeCounter(postId);
		const likedList = await dbTest.getLikes(postId);
		
		console.log(post._fieldsProto.title.stringValue + " posted by " + post_username);
		console.log("Likes: " + likes + ", by " + likedList);
	}
	
	if (userInput == "lp") {
		if (user == "" || currentId == "") {
			console.log("Not logged in!");
		}
		else {
			
			const postId = prompt("Enter post ID: ");
			
			
			const res = await dbTest.incrementLikes(postId, currentId);
			
			if (res) {
				console.log("Liked the post successfully.");
			}
			else {
				console.log("Could not like the post successfully.");
			}
		}
	}
	
	if (userInput == "up") {
		if (user == "" || currentId == "") {
			console.log("Not logged in!");
		}
		else {
			
			const postId = prompt("Enter post ID: ");
			const res = await dbTest.decrementLikes(postId, currentId);
			
			if (res) {
				console.log("Unliked the post successfully.");
			}
			else {
				console.log("Could not unlike the post successfully.");
			}
		}
	}
	
	if (userInput == "aa") {
		const email = prompt("Enter email: ");
		const uuid = prompt("Paste UUID: ");
		
		await dbTest.addUserFromAuthenticator(uuid, email);
	}
	
	// EXIT
	if (userInput == "e") {
		userInput = prompt("Exit? y/n: ");
		if (userInput == "y") {
			repeat = false;
		}
	}
}