/*
*	Jesse Han jesse.han53@myhunter.cuny.edu
*	CSCI 499 Capstone Project
*	This is a test document for connecting with the database,
*	but most of its code will be properly implemented in the future.
*/


import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, count, doc } from "firebase/firestore";
const prompt = require('prompt-sync')();

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

// the whole database
const app = initializeApp(firebaseConfig);
var db = getFirestore(app);

// "Table" of users
const usersCollection = db.collection('users');


db.createUser = function (username, email) {
	var data = {
		username: username,
		email: email
	}
	
	// HERE IS WHERE EVERYTHING IS GOING WRONG: i'm trying every single possible way of adding to firestore
	// but for some reason 'add' does not exist, 'set' is giving me a weird alien error (probably because
	// (that module is from the realtime database, not firestore) but as of yet googling returns literally
	// nothing...
	
	console.log(typeof usersCollection);
	
	var res = usersCollection.add(data);
	// CONSOLE OUTPUT: REMOVE LATER
	console.log('Added ', username, ' with email ', email, ' and ID ', res.id, ' to database.');
}

// loop to add users en masse, IDs will be assigned automatically
// test using console to add users
var exit = false;
while (!exit) {
	var user = prompt("Enter username:");
	var email = prompt("Enter email:");
	
	db.createUser(user, email);
	
	var exitResponse = "";
	while (exitResponse != "y" || exitResponse != "n") {
		exitResponse = prompt("Exit? y/n");
	}
	if (exitResponse == "y") {
		exit = true;
	}
}
