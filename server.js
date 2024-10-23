// import packages, routes, helpers
const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// import sequelize connection, which will store the express app session
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create express instance
const app = express();
const PORT = process.env.PORT || 3001;

// create handlebars engine with helpers
const hbs = exphbs.create({ helpers });

//session cookie setup
const sess = {
  // secret key used to sign/encrypt session cookies
  secret: 's123e735c2324r9897e79886t',
  // configure the session cookie
  cookie: {
    maxAge: 3600000, //60 minutes
    httpOnly: true, //prevents cookie from being accessed by JS (XSS)
    // secure: false, //data can be sent over http and https
    secure: false,
    sameSite: 'strict',
    domain: 'localhost'
  },
  resave: false, //avoid unnecessary db updates
  saveUninitialized: true, //save new sessions that may not have associated data
  // db is the sequelize connection object to be used for storing session data
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// set up session middleware
app.use(session(sess));

// tell Express.js to use handlebars template engine for rendering views
app.engine('handlebars', hbs.engine);
/** set the default view engine to handlebars (Express will automatically 
 * look for Handlebars templates when rendering views) */ 
app.set('view engine', 'handlebars');

// middleware
app.use(express.json()); //parse JSON request bodies
app.use(express.urlencoded({ extended: true })); //parse url-encoded request bodies
app.use(express.static(path.join(__dirname, 'public'))); //serve files from public directory
app.use(routes); //mount routes module

// synchronize sequelize models with the db
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});