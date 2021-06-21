const service = require("./service");
const { httpCodes, Exception, errors } = require("../../../utils");

module.exports = {
    signup: async (req, res) => {
        const result = await service.signup(req.body);
        res.status(httpCodes.CREATED).send(result);
    },
    login: async (req, res) => {
        const result = await service.login(req.body);
        res.status(httpCodes.OK).send(result);
    },
    authorization: async (req, res, next) => {
        const authorizationHeader = req.headers["authorization"];
        const token = authorizationHeader?.split(" ")[1];
        if (!token) throw new Exception(errors.Unauthorized);
        const result = await service.authorization(token).catch((err) => next(err));
        if (result) {
            req.user = result;
            next();
        }
    },
}