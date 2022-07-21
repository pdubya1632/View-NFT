// This is where we will set up relationships for the models

// Import all the models
const User = require('./User');
const Nft = require('./Nft');
const Comment = require('./Comment');

// associations

User.hasMany(Nft, {
  as: 'nfts',
  foreignKey: 'owner',
});

Nft.belongsTo(User, {
  foreignKey: 'nft_id',
});

// comment associations
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Nft, {
  foreignKey: 'comment_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Nft.hasMany(Comment, {
  foreignKey: 'comment_id',
});

module.exports = { User, Nft, Comment };
