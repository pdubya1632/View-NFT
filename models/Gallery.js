// set up imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//set up the post object
class Gallery extends Model {}

//set up the init function
Gallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add the reference to the user id that made it
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "gallery",
  }
);
//export the post object
module.exports = Gallery;