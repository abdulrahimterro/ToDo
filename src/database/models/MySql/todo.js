const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../sequelize");
class ToDo extends Model { }
ToDo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Date.now
        }
    },
    {
        sequelize,
        name: { singular: "todo", plural: "todo" },
    }
);

module.exports = ToDo;
