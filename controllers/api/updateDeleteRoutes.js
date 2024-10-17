// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// '/api/add-comment' endpoint


// POST - '/logout' route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
  req.session.destroy(() => {
    res.status(200).end();
  });
  } else {
      res.status(400).json({ message: 'You must be logged in to log out'});
  }
});


module.exports = router;