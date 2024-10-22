// create router instance, import user and dash routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashRoutes = require('./dashboardRoutes');
const newPostRoutes = require('./newPostRoutes');
const newCommentRoutes = require('./newCommentRoutes');

// mount the sub-routers onto paths within the main router
router.use('/user', userRoutes); // '/api/user' endpoint
router.use('/dashboard', dashRoutes); // '/api/dashboard' endpoint
router.use('/new-post', newPostRoutes); // '/api/new-post' endpoint
router.use('/add-comment', newCommentRoutes); // '/api/add-comment' endpoint


module.exports = router;



