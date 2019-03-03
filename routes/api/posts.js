const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//Post Model
const Post = require("../../models/Post");
//Profile Model
const Profile = require("../../models/Profile");
//Validation
const validatePostInput = require('../../validation/post');



//route api/posts/test  GET request
//test posts route
//@access Public
router.get("/test", (req, res) => res.json({msg: "Posts are the SHIT!!!"})
);

//route api/posts  GET request
//Get posts 
//@access Public
router.get("/", (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsFound: "There is posts found"}));
});

//route api/posts/:id  GET request
//Get posts by id
//@access Public
router.get("/:id", (req,res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({nopostFound: "There is post with that that ID"}));
});

//route api/posts  Post request
//Create posts 
//@access Private

router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const{errors, isValid } = validatePostInput(req.body);
    //Check Validation
    if(!isValid){
        //if any errors, send 400 status
        return res.status(400).json(errors)
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post));
});

//route api/posts/:id  DELETE request
//Delete posts 
//@access Private

router.delete(
    "/:id", 
    passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
           .then(profile => {
               Post.findById(req.params.id)
                .then(post => {
                   // Check for post owner
                   if(post.user.toString() !== req.user.id){
                    return res.status(401).json({ notauthorized: "User not authorized" })
                   } 
                   //Delete
                   post.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ postnotfound: "No Post Found" }))
           })
})

//route api/posts/like/:id  POST request
//Like post 
//@access Private

router.post(
    "/like/:id", 
    passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
           .then(profile => {
               Post.findById(req.params.id)
                .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                    return res.status(400).json({alreadyliked: "User already liked this post"});
                    }
                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id })
                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postnotfound: "No Post Found" }))
    })
})

//route api/posts/unlike/:id  POST request
//Unlike post 
//@access Private

router.post(
    "/unlike/:id", 
    passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
           .then(profile => {
               Post.findById(req.params.id)
                .then(post => {
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                    return res
                            .status(400)
                            .json({notliked: "You have not liked this post"});
                    }
                    // Get remove index
                    const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id)

                    //Splice out of array
                    post.likes.splice(removeIndex, 1);

                    //Save
                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postnotfound: "No Post Found" }))
    })
})

//route api/posts/comment/:id  POST request
//Comment on a post 
//@access Private

router.post("/comment/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check Validation
    if(!isValid) {
        //if any errors, send 400 status
        return res.status(400).json(errors)
    }

 Post.findById(req.params.id)
 .then(post => {
     const newComment = {
       text: req.body.text,
       name: req.body.name,
       avatar: req.body.avatar,
       user: req.user.id
     }
     //Add to comments array
     post.comments.unshift(newComment)

     //Save 
     post.save().then(post => res.json(post))
 })   
 .catch(err => res.status(404).json({ postnotfound: "No post found" }))
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          // Check to see if comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: 'Comment does not exist' });
          }
  
          // Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
  
          // Splice comment out of array
          post.comments.splice(removeIndex, 1);
  
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
  );

module.exports = router;