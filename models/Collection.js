// set up imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//set up the post object
class Collection extends Model {}

//set up the init function
Collection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Add the reference to the user id that made it
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'collection',
  }
);
//export the post object
module.exports = Collection;
