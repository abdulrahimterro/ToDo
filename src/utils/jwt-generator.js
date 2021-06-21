const { jwt } = require("../../config/index");
const { sign } = require("jsonwebtoken");

module.exports = (user) => {
    const payload = user.id;
    const accessToken = sign(payload, jwt.access.key);
    const refreshToken = sign(payload, jwt.refresh.key);

    return { accessToken, refreshToken };
};