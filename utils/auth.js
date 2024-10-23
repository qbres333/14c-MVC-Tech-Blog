// if user is not logged in, redirect to login page
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        return res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;