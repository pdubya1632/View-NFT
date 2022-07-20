// This is where we will set up relationships for the models

// Import all the models
const User = require('./User');
const Collection = require('./Collection');
const Comment = require('./Comment');
const Nft = require('./Nft');

// associations

User.hasMany(Collection, {
  as: 'collections',
  foreignKey: 'user_id',
});

Collection.belongsTo(User, {
  foreignKey: 'user_id',
});

Collection.hasMany(Nft, {
  as: 'nfts',
  foreignKey: 'nft_id',
});

Nft.belongsTo(Gallery, {
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

module.exports = { User, Collection, Comment, Nft };
