// if user is not logged in, redirect to login page
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        console.log(req.url);
        if (req.url === '/login' || req.url === '/signup') {
            return next();
        }
        return res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;