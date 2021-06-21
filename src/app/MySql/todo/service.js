const sequelize = require("../../../database");
const db = sequelize.models;
const { Exception, errors } = require("../../../utils");
const _ = require("lodash");

class todo {
    static async add(body, token) {
        const completed = body.completed || false;
        const title = body.title || body.data.slice(0, 5) + "...";
        const todo = db.ToDo.create({ UserId: token.id, title: title, data: body.data, completed: completed });
        if (!todo) throw new Exception(errors.Item_Not_Created);
        return todo;
    };
    static async find(id, token) {
        const result = await db.ToDo.findByPk(id);
        if (!result) throw new Exception(errors.Item_Not_Found);
        if (result.UserId.toString() != token.id.toString()) throw new Exception(errors.Unauthorized);
        return result;
    };
    static async findAll(token) {
        const result = await db.ToDo.findAll({ where: { UserId: token.id } });
        return result;
    };
    static async delete(id, token) {
        const item = await db.ToDo.findByPk(id);
        if (!item) throw new Exception(errors.Item_Not_Found);
        if (item.UserId.toString() != token.id.toString()) throw new Exception(errors.Unauthorized);
        await db.ToDo.destroy({ where: { id: id } });
    };
    static async update(body, token) {
        const item = await db.ToDo.findByPk(body.id);
        if (!item) throw new Exception(errors.Item_Not_Found);
        if (item.userId.toString() != token.id.toString()) throw new Exception(errors.Unauthorized);
        let { title, data, completed } = body;
        const date = Date.now();
        if (!title) title = item.title;
        if (!data) data = item.data;
        if (!completed) completed = item.completed;
        const result = await db.ToDo.update({ title: title, data, date: date, completed: completed }, { where: { id: body.id } });
        return result;
    }
}

module.exports = todo