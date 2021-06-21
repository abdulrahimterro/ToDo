const service = require("./service");
const { httpCodes } = require("../../utils");

module.exports = {
    add: async (req, res) => {
        const result = await service.add(req.body, req.user);
        res.status(httpCodes.CREATED).send(result);
    },
    find: async (req, res) => {
        console.log(req.params);
        const result = await service.find(req.params.id, req.user);
        res.status(httpCodes.OK).send(result);
    },
    delete: async (req, res) => {
        await service.delete(req.params.id, req.user);
        res.status(httpCodes.DELETED).send();
    },
    update: async (req, res) => {
        const result = await service.update(req.body, req.user);
        res.status(httpCodes.UPDATED).send(result);
    },
}