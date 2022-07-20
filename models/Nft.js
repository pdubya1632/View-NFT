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
    name: {
        type:DataTypes.STRING,
        allowNull:false

    },
    description: {
        type:DataTypes.STRING,
        allowNull: true,

    },
    Image: {
        type:DataTypes.STRING,
        allowNull:false,

    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        },
    }
 },
 {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "nft"
 }
);

module.exports = Nft;