// import db connection and models
const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

// data to be seeded
const userData = require('./userDataSeeds.json');
const blogData = require('./blogDataSeeds.json');
const commentData = require('./commentDataSeeds.json');

const seedDatabase = async () => {
    // synchronize models with db; drops existing tables to seed a fresh db
    await sequelize.sync({ force: true });
    // bulk create users table
    const users = await User.bulkCreate(userData, {
        // hash individual user passwords
        individualHooks: true,
        // return newly created user records, stored in users array
        returning: true,
    });
    console.log(users); //test
    
    // create blogpost table
    const blogs = await BlogPost.bulkCreate(blogData, {
        returning: true,
    });
    console.log(blogs);//test

    // create comment table
    const comments = await Comment.bulkCreate(commentData, {
        returning: true
    });
    console.log(comments); //test

    console.log(`\nData seeded successfully!`);

    process.exit(0);
}

seedDatabase();