/*
*	Written by: Jesse Han jesse.han53@myhunter.cuny.edu
*	CSCI 499 Capstone Project
*/

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import admin from "firebase-admin";


class Database {
	
	constructor(serviceAccount, databaseURL) {
		this.app = admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: databaseURL
		});
		
		this.db = getFirestore(this.app);
		this.usersCollection = this.db.collection('users');
		this.forumCollection = this.db.collection('forum');
	}


	/*
	*	Returns the object containing the reference to the user in the collection with "username".
	* Returns null if this entry does not exist.
	*/
	async getUserByUsername(username) {
		const query = await this.usersCollection.where('username', '==', username).get();
		
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
	async getUserById(id) {
		const query = await this.usersCollection.where('id', '==', id).get();
		
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
	async getUsernameFromId(id) {
		const out = await this.getUserById(id);
		
		if (out == null) {
			return null;
		}
		else {
			return out._fieldsProto.username.stringValue;
		}
	}

	// Like getUsernameFromId, but gets the ID based on username.
	async getIdFromUsername(username) {
		const out = await this.getUserByUsername(username);
		
		if (out == null) {
			return null;
		}
		else {
			return out._fieldsProto.id.stringValue;
		}
	}

	// Returns true/false if the username exists in the database.
	async usernameTaken(username) {
		const result = (await this.getUserByUsername(username) != null);
		return result;
	}

	/*
	*	username, email, display: string
	* Returns false if the username already exists, or is not in the correct format (currently just alphanumeric)
	*/
	async addUserToDatabase(username, email, display) {
		
		if (await this.usernameTaken(username) || !this.allowableUsername(username)) {
			return false;
		}
		
		const data = {
			username: username,
			email: email,
			display: display
		}
		
		const res = await this.usersCollection.add(data);
		const newUser = await this.usersCollection.doc(res.id);
		const amendment = await newUser.update({id: res.id});
		return true;
	}

	async addUserFromAuthenticator(uuid, email) {
		const data = {
			username: uuid,
			id: uuid,
			email: email,
			display: email,
		}
		
		const res = await this.usersCollection.doc(uuid).set(data);
	}

	/*
	*	Returns false if new username is taken
	* Returns true when successful
	*/
	async changeUsername(id, newUser) {
		const duplicateUsername = await this.usernameTaken(newUser);
		if (duplicateUsername) {
			return false;
		}
		else {
			const usernameUpdate = this.usersCollection.doc(id);
			const res = await usernameUpdate.update({username: newUser});
			return true;
		}

	}

	/*
	* Returns true if given string is alphanumeric, false if otherwise.
	* Characters of "allowable usernames" will likely change later.
	*/
	allowableUsername(str) {
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
	async makePost(posterId, title, body) {
		
		const timestamp = admin.firestore.Timestamp.now();
		const jsTimestamp = timestamp.toDate();
		
		const post = {
			title: title,
			body: body,
			likes: 0,
			poster_id: posterId,
			posted: timestamp,
			liked: [],
			replies: [],
			parent_post: ""
		}
		
		const res = await this.forumCollection.add(post);
		const newPost = this.forumCollection.doc(res.id);
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
	async getPostsFilteredSorted(filter, filterQuery, orderBy, order = "desc", x = -1) {
		var query;
		if (x >= 0) {
			query = await this.forumCollection.where(filter, '==', filterQuery).orderBy(orderBy, order).limit(x).get();
		}
		else {
			query = await this.forumCollection.where(filter, '==', filterQuery).orderBy(orderBy, order).get();
		}
		if (query.docs.empty) {
			return null;
		}
		else {
			return query.docs;
		}
	}

	// Same as above just unsorted.
	async getPostsFiltered(filter, filterQuery, x = -1) {
		var query;
		if (x > 0) {
			query = await this.forumCollection.where(filter, '==', filterQuery).limit(x).get();
		}
		else {
			query = await this.forumCollection.where(filter, '==', filterQuery).get();
		}
		
		if (query.docs.empty) {
			return null;
		}
		else {
			return query.docs;
		}
	}

	// Same again, but unfiltered and only sorted.
	async getPostsSorted(orderBy, order = "desc", x = -1) {
		var query;
		if (x >= 0) {
			query = await this.forumCollection.orderBy(orderBy, order).limit(x).get();
		}
		else {
			query = await this.forumCollection.orderBy(orderBy, order).get();
		}
		
		if (query.docs.empty) {
			return null;
		}
		else {
			return query.docs;
		}
	}
	
	// Only gets posts that do not have a parent post (aka are not replying to another post)
	async getPostFeed(orderBy = "posted", order = "desc", x = -1) {
		var query;
		if (x >= 0) {
			query = await this.forumCollection.where("parent_post", "==", "").orderBy(orderBy, order).limit(x).get();
		}
		else {
			query = await this.forumCollection.where("parent_post", "==", "").orderBy(orderBy, order).get();
		}
		
		if (query.docs.empty) {
			return null;
		}
		else {
			return query.docs;
		}
	}
	
	// Returns post fields based on the ID given. If the id does not lead to a post, returns null
	async getPostById(postId) {
		const post = await this.forumCollection.doc(postId).get();
		if (post == null) {
			return null;
		}
		return post;
	}
	
	// Returns the integer value for the number of likes a post has. If the id does not lead to a post, returns null
	async getLikeCounter(postId) {
		const post = await this.getPostById(postId);
		if (post == null) {
			return null;
		}
		return post._fieldsProto.likes.integerValue;
	}
	
	// Returns the array of user IDs who have liked the post. If the id does not lead to a post, returns null
	async getLikes(postId) {
		const post = await this.getPostById(postId);
		if (post == null) {
			return null;
		}
		return post._fieldsProto.liked.arrayValue.values;
	}
	
	// Returns a query of posts where a user ID appears in the list of user likes.
	async getUserLikedPosts(userId) {
		var res = await this.forumCollection.where('liked', 'array-contains', userId);
		return res;
	}
	
	// Returns true if a user has liked a particular post, false if the user has not, or if either post or user do not exist..
	async userLiked(postId, userId) {
		var res = await this.forumCollection.where('liked', 'array-contains', userId);
		res = await res.where('id', '==', postId).get();
		return !res.empty;
	}
	
	// Increments the like counter and adds user ID to the list of user likes. Returns false if the user has already liked it.
	async incrementLikes(postId, userId) {
		const liked = await this.userLiked(postId, userId);
		if (liked) {
			return false;
		}
		const post = await this.getPostById(postId);
		
		var new_likes = await this.getLikeCounter(postId);
		new_likes ++;
		
		const overwrite = await this.forumCollection.doc(postId);
		await overwrite.update({liked: FieldValue.arrayUnion(userId), likes: new_likes});
		
		return true;
	}
	
	// Like above, but with decrementing. Returns false if the user has not liked it.
	async decrementLikes(postId, userId) {
		
		const liked = await this.userLiked(postId, userId);
		if (!liked) {
			return false;
		}
		const post = await this.getPostById(postId);
		
		var new_likes = await this.getLikeCounter(postId);
		new_likes --;
		
		const overwrite = await this.forumCollection.doc(postId);
		await overwrite.update({liked: FieldValue.arrayRemove(userId), likes: new_likes});
		
		return true;
	}
	
	// Creates a post, similar to makePost(). It will add the post as a reply to the supplied parent post ID, and set that post as this post's parent. Returns false if the parent post does not exist.
	async replyToPost(postId, posterId, title, body) {
		const parentPost = await this.getPostById(postId);
		if (parentPost == null) {
			return false;
		}
		
		// Create & make post
		const timestamp = admin.firestore.Timestamp.now();
		const jsTimestamp = timestamp.toDate();
		
		const post = {
			title: title,
			body: body,
			likes: 0,
			poster_id: posterId,
			posted: timestamp,
			liked: [],
			replies: [],
			parent_post: postId
		}
		
		const res = await this.forumCollection.add(post);
		const newPost = this.forumCollection.doc(res.id);
		await newPost.update({id: res.id});
		
		// Add post to list of replies to parent post
		const overwrite = await this.forumCollection.doc(postId);
		await overwrite.update({replies: FieldValue.arrayUnion(res.id)});
	}
	
	// Returns null if the post ID points to a non-existing post. Otherwise returns an array containing the IDs of posts that reply to this one.
	async getReplies(postId) {
		const post = await this.getPostById(postId);
		if (post == null) {
			return null;
		}
		return post._fieldsProto.replies.arrayValue.values;
	}
	
	// Returns null if the post ID points to a non-existing post, or if the parent post ID to this post does not exist. Otherwise returns the ID of the parent post.
	async getParentPost(postId) {
		const post = await this.getPostById(postId);
		if (post == null) {
			return null;
		}
		return post._fieldsProto.parent_post.stringValue;
	}
	
	// Overwrites the user's profile customizations with the array of components supplied.
	async overwriteUserCustomizations(userId, newCustomsArr) {
		const user = await this.usersCollection.doc(userId);
		if (user == null) {
			return false;
		}
		
		await user.update({
			customizations: FieldValue.delete()
		});
		// console.log('newCustomsArr', newCustomsArr)
		for (var i = 0; i < newCustomsArr.length; i ++) {
			await user.update({
				customizations: FieldValue.arrayUnion(newCustomsArr[i])
			});
		}
	}
	
	// Returns the current customizations of a user's profile as an array.
	async getUserCustomizations(userId) {
		const user = await this.getUserById(userId);
		if (user == null || user._fieldsProto.customizations == null) {
			return null;
		}
		
		return user._fieldsProto.customizations.arrayValue.values;
	}
	

}


export default Database;