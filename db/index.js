import express from 'express';
import cors from 'cors';

import Database from './db.js';
import { firebaseKey, firebaseURL } from './firebase-key.js';

const app = express();
app.use(cors());
app.use(express.json());

const oneDatabase = new Database(firebaseKey, firebaseURL);

app.get("/getUsername", async (req, res) => { 
    let userID = req.query.uid;
    let username = await oneDatabase.getUsernameFromId(userID);
    res.send(username);
});

app.get("/getLikesCounter", async (req, res) => {
    let postID = req.query.postId;
    let postLikesNumber = await oneDatabase.getLikeCounter(postID);
    res.send(postLikesNumber);
});

app.get("/getPost", async (req, res) => {
    let postID = req.query.postId;
    const onePost = await oneDatabase.getPostsFiltered("id", postID, 1);
    const currentPost = onePost[0]._fieldsProto;
    const post = {
        postId: currentPost.id.stringValue,
        username: currentPost.poster_id.stringValue,
        header: currentPost.title.stringValue,
        body: currentPost.body.stringValue,
        likes: currentPost.likes.integerValue
    };

    res.send(post);
});

app.get("/getUserLiked", async (req, res) => {
    let postID = req.query.postId;
    let userID = req.query.username;
    const liked = await oneDatabase.userLiked(postID, userID);

    res.send(liked);
});

app.get("/getPosts", async (req, res) => {
    const posts = await oneDatabase.getPostsSorted("posted", "desc", -1);
    const postsList = [];

    for (let i = 0; i < posts.length; i++) {
        const currentPost = posts[i]._fieldsProto;
        const currentPostUser = await oneDatabase.getUserById(currentPost.poster_id.stringValue);
        //const posterUsername = currentPostUser._fieldsProto.username.stringValue;
        //console.log(currentPost.title.stringValue + " posted by:" + currentPost.poster_id.stringValue + " - " + currentPost.body.stringValue);
        const post = {
            postId: currentPost.id.stringValue,
            username: currentPost.poster_id.stringValue,
            header: currentPost.title.stringValue,
            body: currentPost.body.stringValue,
            likes: currentPost.likes.integerValue
        };
        postsList.push(post);
    }

    res.send(postsList);
});

app.post("/addLike", async (req, res) => {
    let postID = req.body.params.postId;
    let userID = req.body.params.username;

    let incrementedLike = await oneDatabase.incrementLikes(postID, userID);
    res.send(incrementedLike);
});

app.post("/removeLike", async (req, res) => {
    let postID = req.body.params.postId;
    let userID = req.body.params.username;

    let decrementedLike = await oneDatabase.decrementLikes(postID, userID);
    res.send(decrementedLike);
});

app.post("/createPost", async (req, res) => {
    let post = req.body;
    let posted = await oneDatabase.makePost(post.username, post.header, post.body);
    res.send(posted);
});


app.listen(5000, () => {console.log("app is running")});