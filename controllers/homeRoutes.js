// create router instance, import models, utils
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// homepage, '/' route
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
        // pass data and session flag into template
        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

// view specific post; add withAuth so only logged in users can post comments
router.get('/blogpost/:id', withAuth, async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['user_id']
                }
            ]
        });

        const blogpost = blogData.get({ plain: true });

        res.render('blogpost', {
            ...blogpost,
            logged_in: true
        });

    } catch(err) {
        res.status(500).json(err);
    }
})

// add comment to post (update) when post is clicked
    // ***** add comment model
    // add comment property to blogpost model ******