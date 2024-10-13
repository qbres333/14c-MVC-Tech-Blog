// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// '/api/dashboard' endpoint

// view user-specific posts
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
          // match the user id to the blogpost user_id property
          where: {
            user_id: req.session.user_id,
          },
          include: [
            { model: User, attributes: ['username'] },
            { model: Comment }, //add Comment model if needed
          ],
        });
        // serialize the data so the template can read it
        const userPosts = blogData.map((blogpost) => blogpost.get({ plain: true }));
        // render dashboard view with all the user's posts
        res.render('dashboard', {
            blogposts: userPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new post
router.post('/new-post', withAuth, async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id, //set user_id to user's id
        });
        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/new-post', withAuth, async (req, res) => {
  try {
    res.render('new-post');
  } catch (err) {
    alert('Error rendering new post form');
    console.error(err);
    res.status(500).json(err);
  }
})

// update a specific post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
        // user can only update their own post!
        user_id: req.session.user_id,
      },
    });
    // return error if update returns 0 (# of updated posts is 1)
    if (postData[0] === 0) {
      res.status(404).json({ message: 'Blog post not found!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a specific post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        // post must belong to the logged-in user!
        user_id: req.session.user_id,
      },
    });
    // return an error if post id not found
    if (!postData) {
      res.status(404).json({ message: 'Blog post not found!' });
      return;
    }
    // show the number of deleted posts (1)
    res.status(200).json(postData);
  } catch (err) {
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

//render homepage when logged out
// router.get('/logout', (req, res) => {
//     res.render('homepage');
// });


module.exports = router;