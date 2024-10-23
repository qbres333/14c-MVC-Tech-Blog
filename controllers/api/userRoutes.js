// create router instance, import User model
const router = require('express').Router();
const { User } = require('../../models');

// '/api/user' endpoint


// POST - '/signup' route, send new user info to db & save data in session cookie
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST - '/login' route to evaluate form data & save data in session cookie
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
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        })
    } catch(err) {
        res.status(400).json(err);
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