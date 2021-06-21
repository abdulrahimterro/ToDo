const httpCodes = require("../http-codes");
const statusCode = require("../status-codes");
const models = require("./models");

module.exports = {
    Item_Not_Created: {
        httpStatus: httpCodes.BAD_REQUEST,
        code: models.toDoList + statusCode.INVALID_OPERATION + "01",
        msg: "Item not found",
    },
    Item_Not_Found: {
        httpStatus: httpCodes.BAD_REQUEST,
        code: models.toDoList + statusCode.ITEM_NOT_FOUND + "02",
        msg: "Item not found",
    },
}