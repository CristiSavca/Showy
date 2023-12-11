import express from 'express';
import cors from 'cors';

import Database from './db.js';
import { firebaseKey, firebaseURL } from './firebase-key.js';

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

const oneDatabase = new Database(firebaseKey, firebaseURL);

app.get("/getUsername", async (req, res) => { 
    const userID = req.query.uid;
    const username = await oneDatabase.getUsernameFromId(userID);
    res.send(username);
});

app.get("/getLikesCounter", async (req, res) => {
    const postID = req.query.postId;
    const postLikesNumber = await oneDatabase.getLikeCounter(postID);
    res.send(postLikesNumber);
});

app.get("/getPost", async (req, res) => {
    const postID = req.query.postId;
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
    const postID = req.query.postId;
    const userID = req.query.username;
    const liked = await oneDatabase.userLiked(postID, userID);

    res.send(liked);
});

app.get("/getPosts", async (req, res) => {
    // const posts = await oneDatabase.getPostsSorted("posted", "desc", -1);
    const posts = await oneDatabase.getPostFeed("posted", "desc", -1);
    const postsList = [];

    let post;
    let currentPost;

    for (let i = 0; i < posts.length; i++) {
        currentPost = posts[i]._fieldsProto;

        post = {
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

app.get("/getComments", async (req, res) => {
    const postID = req.query.postId;

    const commentIDs = await oneDatabase.getReplies(postID);

    if (commentIDs.length !== 0) {
        const comments = [];
        let comment = "";
        let commentPost;
        let commentPostValues;
        for (let i = 0; i < commentIDs.length; i++) {
            comment = await oneDatabase.getPostById(commentIDs[i].stringValue);
            commentPost = comment._fieldsProto;
            commentPostValues = {
                commentId: commentPost.id.stringValue,
                username: commentPost.poster_id.stringValue,
                header: commentPost.title.stringValue,
                body: commentPost.body.stringValue,
                likes: commentPost.likes.integerValue,
            };
            comments.push(commentPostValues);
        }
        //console.log(comments);
        res.send(comments);
    } else {
        //console.log("No comments");
        res.send([]);
    }
});

app.post("/addLike", async (req, res) => {
    const postID = req.body.params.postId;
    const userID = req.body.params.username;

    const incrementedLike = await oneDatabase.incrementLikes(postID, userID);
    res.send(incrementedLike);
});

app.post("/removeLike", async (req, res) => {
    const postID = req.body.params.postId;
    const userID = req.body.params.username;

    const decrementedLike = await oneDatabase.decrementLikes(postID, userID);
    res.send(decrementedLike);
});

app.post("/createPost", async (req, res) => {
    const post = req.body;
    const posted = await oneDatabase.makePost(post.username, post.header, post.body);
    res.send(posted);
});

app.post("/createComment", async (req, res) => {
    const comment = req.body;
    const commented = await oneDatabase.replyToPost(comment.postId, comment.posterId, comment.title, comment.body);

    res.send(commented);
});

app.patch("/changeCustomizations", async (req, res) => {
    let info = req.body;
    // console.log('req.customizations', req.customizations, req)
    let custom = await oneDatabase.overwriteUserCustomizations(info.uuid, req);
    // let custom = await oneDatabase.overwriteUserCustomizations(info.uuid, req.customizations);
    res.send(custom);
});

app.get("/getCustomizations", async (req, res) => {
    let userID = req.query.uid;
    let custom = await oneDatabase.getUserCustomizations(userID);
    res.send(custom);
});

app.post("/addUserFromAuthenticator", async (req, res) => {
    const { uuid, email } = req.body;
    const added = await oneDatabase.addUserFromAuthenticator(uuid, email);
    res.send(added);
 }); 

app.listen(5000, () => {console.log("app is running on port 5000")});
//app.listen(5001, () => {console.log("app is running on port 5001")});