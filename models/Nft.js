// set up imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//set up object
class Nft extends Model {}

Nft.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    for_sale: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    floor_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    collection: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner: {
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
    modelName: 'nft',
  }
);

module.exports = Nft;
