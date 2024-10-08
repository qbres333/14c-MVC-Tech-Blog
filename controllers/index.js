// create router instance, import api and home routes
const router = require('express').Router();
const apiRoutes = require('./api');

// mount the api route
router.use('/api', apiRoutes);

module.exports = router;

