// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// '/api/update' endpoint

// render edit-post view --------------------------------------
router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
          where: {
            user_id: req.session.user_id,
          },
        });

        const blogpost = blogData.get({ plain: true });
        // render blogpost view
        res.render('edit-post', {
          ...blogpost,
          logged_in: true,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


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
    console.error(err);
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