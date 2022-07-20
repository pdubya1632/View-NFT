// This is where we will set up relationships for the models

// Import all the models
const User = require('./User');
const Gallery = require('./Gallery');
const Collection = require('./Collection');
const Comment = require('./Comment');
const Nft = require('./Nft');

// associations

User.hasMany(Gallery, {
  as: 'galleries',
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

Comment.belongsTo(Gallery, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Gallery.hasMany(Comment, {
  foreignKey: 'post_id',
});

module.exports = { User, Gallery, Comment, Nft };
