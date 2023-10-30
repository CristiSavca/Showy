/*
*	Written by: Jesse Han jesse.han53@myhunter.cuny.edu
*	CSCI 499 Capstone Project
*/

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import Database from "./db.js"

const prompt = require('prompt-sync')();

const svcAccount = require("D:/Downloads/showy-92cc7-firebase-adminsdk-g3h0s-dc80e19b7c.json");
const dbURL = "https://showy-92cc7-default-rtdb.firebaseio.com/";

// -------------- TESTING BELOW -----------

var user = "";
var currentId = "";

const dbTest = new Database(svcAccount, dbURL);

var repeat = true;
while (repeat) {
	var userInput = prompt("(a)ccount, (l)og in, (c)hange username, (p)ost, (g)et posts, (e)xit, (aa)dd user from authenticator: ");
	
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