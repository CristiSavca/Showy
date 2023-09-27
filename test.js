/*
*	Jesse Han jesse.han53@myhunter.cuny.edu
*	CSCI 499 Capstone Project
*	This is a test document for connecting with the database,
*	but most of its code will be properly implemented in the future.
*/


import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const admin = require("firebase-admin");
var serviceAccount = require("D:/Downloads/test-464fe-firebase-adminsdk-wqeuq-b21eb5d582.json");
const { getFirestore, Timestamp, FieldValue, Filter, collection, doc } = require('firebase-admin/firestore');
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
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-464fe-default-rtdb.firebaseio.com"
});

var db = getFirestore(app);

// "Table" of users
const usersCollection = db.collection('users');


db.createUser = async function (username, email, display) {
	var data = {
		username: username,
		email: email,
		display: display
	}
	
	// HERE IS WHERE EVERYTHING IS GOING WRONG: i'm trying every single possible way of adding to firestore
	// but for some reason 'add' does not exist, 'set' is giving me a weird alien error (probably because
	// (that module is from the realtime database, not firestore) but as of yet googling returns literally
	// nothing...
	
	var res = await usersCollection.add(data);
	// CONSOLE OUTPUT: REMOVE LATER
	console.log('Added ', username, ' with email ', email, ' and display name ', display, ' to database.');
}

// loop to add users en masse, IDs will be assigned automatically
// test using console to add users
var user = prompt("Enter username: ");
var display = prompt("Enter display name: ");
var email = prompt("Enter email: ");
	
db.createUser(user, email, display);
