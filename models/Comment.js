// reference Finola's Challenge 14C model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      // type changed to TEXT because STRING has a 255-character limit
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // link the user id of person posting a comment
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // link each comment to a blogpost
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost',
        key: 'id',
      },
      allowNull: false, //ensure every comment belongs to a post
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);


module.exports = Comment;