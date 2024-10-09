// create router instance, import api and home routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');


// mount the api and home routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes); // homepage endpoint


module.exports = router;

