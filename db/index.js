import express from 'express';
import cors from 'cors';

import Database from './db.js';
import { firebaseKey, firebaseURL } from './firebase-key.js';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';

const app = express();
app.use(cors());
app.use(express.json());

const oneDatabase = new Database(firebaseKey, firebaseURL);




// works

// let test1 = await oneDatabase.getUserByUsername("testchange");
// var user1 = test1._fieldsProto;			
// var userFromUsername = user1.id.stringValue;


// testing

// let test2 = oneDatabase.getUserById("123");
// let test3 = oneDatabase.getUsernameFromId("123");
// let test4 = oneDatabase.getIdFromUsername("testchange");
// let test5 = oneDatabase.usernameTaken("testchange");
// let test6= oneDatabase.addUserToDatabase("testchange", "test6@email.com", "test6");
// let test7 = oneDatabase.addUserFromAuthenticator("hsyEGxb4RKNSxBhy1jXIzmHxXSu2", "jennyton88@gmail.com");
// let test8 = oneDatabase.changeUsername("123", "testchange2");
// let test9 = oneDatabase.allowableUsername("testchange2");
// let test10 = oneDatabase.makePost("testchange2", "testchange2 posted", "wow!");



app.get("/getUsername", (req, res) => {
    res.send(userFromUsername);
    console.log("test1", userFromUsername);

});

// app.get("/getUsername", (req, res) => {
//     res.send(test);
//     console.log("test", test);

// });

app.get("/sendSomething", (req, res) => {
    res.send(req.query.testing);
    console.log(req.query.testing);
});



app.listen(5000, () => {console.log("app running")});