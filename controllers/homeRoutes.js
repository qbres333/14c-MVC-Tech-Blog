// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// homepage endpoint

// show all blog posts, joined with user data
router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: [ 'username' ]
                },
            ],
        });

        // serialize the data so the template can read it
        const blogposts = blogData.map((blogpost) => blogpost.get({ plain: true }));
        // pass data and session flag into template; render homepage view
        res.render('partials/homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

// view specific post; add withAuth so only logged in users can post comments
router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['user_id', 'comment']
                }
            ]
        });

        const blogpost = blogData.get({ plain: true });
        // render blogpost view
        res.render('partials/blogpost', {
            ...blogpost,
            logged_in: true
        });

    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;