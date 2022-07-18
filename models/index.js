// Import all the models
const User = require("./User");
const Gallery= require("./Gallery");
const Comment = require("./Comment");
const Nft = require("./Nft")

//set up relationships
User.hasMany(this.Gallery, {
  foreignKey: "user_id",
});
Gallery.belongsTo(User, {
  foreignKey: "user_id",
});
Gallery.hasMany(this.Nft, {
  foreignKey: "nft_id",
});
Nft.belongsTo(Gallery, {
  foreignKey: "nft_id",
});
//associations for the commments
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Gallery, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Gallery, Comment,Nft };
