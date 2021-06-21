const httpCodes = require("./http-codes");
const statusCode = require("./status-codes");
module.exports = {
    ...require("./error/general-errors"),
    ...require("./error/user"),
    ...require("./error/todo"),
}