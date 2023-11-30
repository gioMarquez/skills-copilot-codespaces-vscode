//Create web server using express
//Create a route for comments
//Create a route for comments/new
//Create a route for comments/:id
//Create a route for comments/:id/edit
//Create a route for comments/:id/delete
//Create a route for comments/:id/update

//Import express
const express = require('express');
//Import router
const router = express.Router();
//Import path
const path = require('path');
//Import method-override
const methodOverride = require('method-override');
//Import comments model
const Comment = require('../models/comments');
//Import campground model
const Campground = require('../models/campgrounds');
//Import middleware
const { isLoggedIn, checkCommentOwnership } = require('../middleware');

//Create a route for comments
router.get('/', (req, res) => {
	res.send('This is comments page');
});

//Create a route for comments/new
router.get('/new', isLoggedIn, (req, res) => {
	//Find campground by id
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			//Render new comment form
			res.render('comments/new', { campground: campground });
		}
	});
});

//Create a route for comments/:id
router.post('/', isLoggedIn, (req, res) => {
	//Find campground by id
	Campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			//Create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
				} else {
					//Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//Save comment
					comment.save();
					//Connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					//Redirect to show page
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//Create a route for comments/:id/edit
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
	//Find comment by id
	Comment.findById(req.params.comment_id, (err, foundComment) => {})});