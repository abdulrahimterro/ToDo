const sequelize = require("../../../database");
const db = sequelize.models;
const { Exception, errors, JWTGenerator } = require("../../../utils");
const { verify } = require("jsonwebtoken");
const config = require("../../../../config");
const bcrypt = require("bcrypt");
const _ = require("lodash");

class service {
    static async signup(body) {
        const userExist = await db.User.findOne({ username: body.username });
        if (userExist) throw new Exception(errors.User_Name_Exist);
        const emailExist = await db.User.findOne({ email: body.email });
        if (emailExist) throw new Exception(errors.User_Email_Exist);
        const user = await db.User.create({ username: body.username, password: body.password, email: body.email, dateBirth: body.dateBirth, city: body.city, street: body.street });
        return user;
    };
    static async login(body) {
        const user = await db.User.findOne({ username: body.username });
        if (user == null) throw new Exception(errors.User_Not_Found);
        const isValid = await bcrypt.compare(body.password, user.password);
        if (!isValid) throw new Exception(errors.User_Not_Found);
        const result = JWTGenerator(user);
        result.user = _.omit(user.dataValues, ["password", "dateBirth", "city", "street"]);
        return result;
    };
    static async authorization(token) {
        const payload = verify(token, config.jwt.access.key);
        let user = await db.User.findByPk(payload);
        if (user == null) throw new Exception(errors.Unauthorized);
        const User = _.omit(user.dataValues, ["password", "dateBirth", "city", "street"]);
        return User;
    };
}

module.exports = service;