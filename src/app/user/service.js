const { User } = require("../../database/models/");
const { Exception, errors, JWTGenerator } = require("../../utils");
const { verify } = require("jsonwebtoken");
const config = require("../../../config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
class service {
    static async signup(body) {
        const userExist = await User.findOne({ username: body.username });
        if (userExist) throw new Exception(errors.User_Name_Exist);
        const emailExist = await User.findOne({ email: body.email });
        if (emailExist) throw new Exception(errors.User_Email_Exist);
        const user = new User({ username: body.username, password: body.password, email: body.email, dateBirth: body.dateBirth, address: { city: body.city, street: body.street } }).save();
        return user;
    };
    static async login(body) {
        const user = await User.findOne({ username: body.username });
        if (user == null) throw new Exception(errors.User_Not_Found);
        const isValid = await bcrypt.compare(body.password, user.password);
        if (!isValid) throw new Exception(errors.User_Not_Found);
        const result = JWTGenerator(user);
        result.user = _.omit(user.toObject(), ["password", "dateBirth"]);
        return result;
    };
    static async authorization(token) {
        const payload = verify(token, config.jwt.access.key);
        let user = await User.findById(payload, "_id username email");
        if (user == null) throw new Exception(errors.Unauthorized);
        return user;
    };
}

module.exports = service;