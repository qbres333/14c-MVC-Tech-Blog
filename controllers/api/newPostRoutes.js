// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// '/api/new-post' endpoint
// create new post
router.post('/', withAuth, async (req, res) => {
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

//render new post view
// router.get('/new-post', withAuth, (req, res) => {
//     res.render('new-post');
// })


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