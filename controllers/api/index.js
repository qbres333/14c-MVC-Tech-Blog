// create router instance, import user and dash routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashRoutes = require('./dashboardRoutes');
const newPostRoutes = require('./newPostRoutes');
const newCommentRoutes = require('./newCommentRoutes');
const blogCommentRoutes = require('./blogCommentRoutes');

// mount the sub-routers onto paths within the main router
router.use('/user', userRoutes); // '/api/user' endpoint
router.use('/dashboard', dashRoutes); // '/api/dashboard' endpoint
router.use('/new-post', newPostRoutes); // '/api/new-post' endpoint
router.use('/new-comment', newCommentRoutes); // '/api/add-comment' endpoint
router.use('/comments', blogCommentRoutes); /**  '/api/comments' endppoint, 
to view blogpost with associated comments */


module.exports = router;



