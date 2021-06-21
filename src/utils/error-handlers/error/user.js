const httpCodes = require("../http-codes");
const statusCode = require("../status-codes");
const models = require("./models");
module.exports = {
    User_Not_Created: {
        httpStatus: httpCodes.BAD_REQUEST,
        code: models.user + statusCode.INVALID_OPERATION + "01",
        msg: "User not created."
    },
    User_Not_Found: {
        httpStatus: httpCodes.BAD_REQUEST,
        code: models.user + statusCode.ITEM_NOT_FOUND + "02",
        msg: "User not found."
    },
    User_Name_Exist: {
        httpStatus: httpCodes.BAD_REQUEST,
        code: models.user + statusCode.INVALID_OPERATION + "03",
        msg: "Username exist."
    },
    User_Email_Exist: {
        httpStatus: httpCodes.BAD_REQUEST,
        code: models.user + statusCode.INVALID_OPERATION + "03",
        msg: "Email exist."
    },
}