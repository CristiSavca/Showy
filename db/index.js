import express from 'express';
import cors from 'cors';

import Database from './db.js';
import { firebaseKey, firebaseURL } from './firebase-key.js';

const app = express();
app.use(cors());
app.use(express.json());

const oneDatabase = new Database(firebaseKey, firebaseURL);


// works

// let test1 = await oneDatabase.getUserByUsername("testchange");
// var user1 = test1._fieldsProto.id.stringValue;

// let test2 = await oneDatabase.getUserById("123");
// let testuser = test2._fieldsProto.username.stringValue;

// let test3 = await oneDatabase.getUsernameFromId("123");

// let test4 = await oneDatabase.getIdFromUsername("testchange");

// let test5 = await oneDatabase.usernameTaken("testchange");

// can be added multiple times, but on same user so no duplicates seen
// let test7 = await oneDatabase.addUserFromAuthenticator("hsyEGxb4RKNSxBhy1jXIzmHxXSu2", "jennyton88@gmail.com");

// let test8 = await oneDatabase.changeUsername("123", "testchange2");

//let test9 = await oneDatabase.allowableUsername("123");

//let test10 = await oneDatabase.makePost("testchange2", "testchange2 posted", "wow!");

// not working

// not able to read _fieldsProto // did work pre-merge using db-test.js
//let test6 = await oneDatabase.addUserToDatabase("tester6", "tester6@email.com", "tester6");


// async function testadd() {
//     return await oneDatabase.addUserToDatabase("test6", "tester777@email.com", "testnum6");
// }




// app.get("/getUsername", (req, res) => {
//     res.send(userFromUsername);
//     console.log("test1", userFromUsername);

// });


// testing

async function test18() {
    //let testing = await oneDatabase.getIdFromUsername("newuser12345");
    //let posts = await oneDatabase.getPostsFiltered("poster_id",testing, 10);
    // const posts = await oneDatabase.getPostsFiltered("username", "newuser12345", 10);


    // get by poster id  of posts
   //const posts = await oneDatabase.getPostsFiltered("poster_id", testing, 10);


   // get by certain query
   //const posts = await oneDatabase.getPostsSorted("poster_id", "desc", 10);

    //const postslist = posts;

    // for (var i = 0; i < posts.length; i ++) {
    //     const currentPost = posts[i]._fieldsProto;
    //     const currentPostUser = await oneDatabase.getUserById(currentPost.poster_id.stringValue);
    //     const posterUsername = currentPostUser._fieldsProto.username.stringValue;
    //     console.log(currentPost.title.stringValue + " posted by: " + posterUsername + " - " + currentPost.body.stringValue);
    //     let post = {
    //         title: currentPost.title.stringValue,
    //         username: posterUsername,
    //         body: currentPost.body.stringValue
    //     };
    //     postslist.push(post);
    // }

    //return postslist;
}


app.get("/getUsername", async (req, res) => { 
    let userID = req.query.uid;
    let username = await oneDatabase.getUsernameFromId(userID);
    console.log(username);
    res.send(username);
});

app.post("/createPost", async (req, res) => {
    let post = req.body;
    let posted = await oneDatabase.makePost(post.username, post.header, post.body);
    res.send(posted);
});


app.listen(5000, () => {console.log("app running")});