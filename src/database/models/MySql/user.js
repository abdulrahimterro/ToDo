const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../sequelize");
const { hash } = require("bcrypt");
const { rounds } = require("../../../../config").bcrypt;
const ToDo = require("./todo");

class User extends Model { }
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        username: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        dateBirth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        name: { singular: "user", plural: "users" },
        hooks: {
            beforeCreate: async (instance, option) => {
                instance.password = await hash(instance.password, rounds);
            },
            beforeUpdate: async (instance, option) => {
                if (instance.password)
                    instance.password = await hash(instance.password, rounds);
            },
        },
    }
);
User.hasOne(ToDo)
module.exports = User;
