// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// '/' homepage endpoint

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
        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

// view specific post; add withAuth so only logged in users can post comments
router.get('/posts/:id', withAuth, async (req, res) => {
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
        res.render('blogpost', {
            ...blogpost,
            logged_in: true
        });

    } catch(err) {
        res.status(500).json(err);
    }
})


// route to render dashboard
router.get('/dashboard', (req, res) => {

    if (!req.session.logged_in) {
        // .redirect takes URL parameter
        res.redirect('/login'); //redirect to login page if not logged in
        return;
    }
    // .render takes a view parameter (no / )
    res.render('dashboard');
});

// route to direct user to the login page
router.get('/login', (req, res) => {
    // if user is logged in, redirect to the dashboard view
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    // if user is not logged in, redirect to the login view
    res.render('login');
})

module.exports = router;