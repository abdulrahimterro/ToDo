const httpCode = require("./http-codes");

class Exception {
    constructor({ httpStatus, code, msg, args = {} }) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = msg;
        this.args = args
    }

    static handler(err, req, res, next) {
        let httpStatus = err.httpStatus || httpCode.INTERNAL_SERVER_ERROR;
        let code = err.code || httpCode.INTERNAL_SERVER_ERROR;
        let message = err.code ? err.message : "Internal server error.";
        let args = err.args;

        if (code == 500) console.error(err);
        res.status(httpStatus).json({ code, message, args });
    }
}
module.exports = Exception;