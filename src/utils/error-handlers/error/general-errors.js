const httpCodes = require("../http-codes");
const statusCode = require("../status-codes");
const models = require("./models");

module.exports = {
    // Auth error
    Unauthorized: {
        httpStatus: httpCodes.UNAUTHORIZED,
        code: models.auth + statusCode.INVALID_OPERATION + "03",
        msg: "Unauthorized",
    }
}