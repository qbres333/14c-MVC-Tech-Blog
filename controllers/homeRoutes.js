// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// '/' homepage endpoint

// show all blog posts, joined with user and comment data
router.get('/', async (req, res) => {
    try {
      // get username to display on blogs view (passed in res.render below)
      const user = await User.findByPk(req.session.user_id, {
        attributes: ['username'],
      });
      // use optional chaining to access username property
      const name = user?.username;

      const blogData = await BlogPost.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
          },
        ],
      });
    //   test
    console.log(blogData);

      // serialize the data so the template can read it
      const blogposts = blogData.map((blogpost) =>
        blogpost.get({ plain: true })
      );
      // pass data and session flag into template; render homepage view
      res.render('homepage', {
        blogposts: blogposts,
        logged_in: req.session.logged_in,
        name
      });
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET route for /login to render the view
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/dashboard'); //redirect to dash if logged in
    }
    // render login.handlebars view
    res.render('login');
});


// view specific post; add withAuth so only logged in users can post comments
router.get('/add-comment/:id', withAuth, async (req, res) => {
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
        },
      ],
    });

    if (!blogData) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const blogpost = blogData.get({ plain: true });
    // render comment view
    res.render('comment', {
      blogpost: blogpost,
      logged_in: true,
      name
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// render dashboard from link on homepage if logged in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
        // get username to display in dashboard view (passed in res.render below)
        const user = await User.findByPk(req.session.user_id, {
          attributes: ['username'],
        });
        // use optional chaining to access username property
        const name = user?.username;

        const blogData = await BlogPost.findAll({
          // match the user id to the blogpost user_id property
          where: {
            user_id: req.session.user_id,
          },
          include: [
            { model: User, attributes: ['username'] },
          ],
        });
        // serialize the data so the template can read it
        const blogposts = blogData.map((blogpost) =>
          blogpost.get({ plain: true })
        );
        // render dashboard view with all the user's posts
        res.render('dashboard', {
          blogposts: blogposts,
          logged_in: req.session.logged_in,
          name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//render new post view
router.get('/dashboard/new-post', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: true,
  });
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