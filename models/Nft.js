// set up imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//set up object
class Nft extends Model{}

Nft.init(
 {
    id: {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    nft_name: {
        type:DataTypes.STRING,
        allowNull:false

    },
    nft_image: {
        type:DataTypes.STRING,
        allowNull: true,

    },
    nft_description: {
        type:DataTypes.STRING,
        allowNull:false,

    },
 },
 {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "nft"
 }
);

module.exports = Nft;
