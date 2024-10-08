// create router instance, import user and dash routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashRoutes = require('./dashRoutes');
const homeRoutes = require('./homeRoutes');


// mount the sub-routers onto paths within the main router
router.use('/user', userRoutes); // '/api/user' endpoint
router.use('/dashboard', dashRoutes); // '/api/dashboard' endpoint
router.use('/home', homeRoutes); // '/api/home' endpoint

module.exports = router;
