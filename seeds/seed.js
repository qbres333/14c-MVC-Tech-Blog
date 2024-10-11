// import db connection and models
const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

// data to be seeded
const userData = require('./userData.json');
const blogData = require('./blogData.json');

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
    // create blogpost table
    for (const blog of blogData) {
            await BlogPost.create({
              ...blog,
            });
        // }
    }
    process.exit(0);
}

seedDatabase();