// import models
const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// user can post many blogposts
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' //if user is deleted, their posts are also deleted
});

// user can post many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' //if a user is deleted, their comments are also deleted
})

// each blogpost is created by one user
BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

// blgopost can have many comments
BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE' //if post is deleted, its comments are also deleted
});

// each comment is linked to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// each comment is linked to a blogpost
Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id'
})


module.exports = { User, BlogPost, Comment };