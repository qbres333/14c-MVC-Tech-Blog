// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

/**  '/api/comments' endppoint, 
to view blogpost with associated comments */

// render blogpost view (blogpost with comments)
router.get('/:id', withAuth, async (req, res) => {
  try {
    // get username to display on blogs view (passed in res.render below)
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['username'],
    });
    // use optional chaining to access username property
    const name = user?.username;

    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          order: [['dateCreated', 'DESC']],
        },
      ],
    });

    if (!blogData) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const blogpost = blogData.get({ plain: true });
    // render blogpost.handlebars view
    res.render('blogpost', {
      blogpost: blogpost,
      logged_in: true,
      name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


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