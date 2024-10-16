// create router instance, import User model
const router = require('express').Router();
const { User } = require('../../models');

// '/api/user' endpoint

// render signup view
router.get('/signup', (req, res) => {
        res.render('signup');
})

// POST - '/signup' route, send new user info to db
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        })
        
    } catch (err) {
        res.status(400).json(err);
    }
})

// POST - '/login' route to evaluate form data
router.post('/login', async (req, res) => {
    try {
        // find user in db by username
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        // if username is not found, return error msg
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // check the password entered (checkPassword from User model)
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' })
        }

        // if user data is correct, log in and save session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        })
    } catch(err) {
        res.status(400).json(err);
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
//         res.render('homepage');
    
// });

module.exports = router;