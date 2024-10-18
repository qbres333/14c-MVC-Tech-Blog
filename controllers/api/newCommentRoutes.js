// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// '/api/new-comment' endpoint

// create new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id, //set user_id to user's id
      blogpost_id: req.body.blogpost_id,
    });
    res.status(200).json(newComment);

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// POST - '/logout' route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(400).json({ message: 'You must be logged in to log out' });
  }
});

module.exports = router;
