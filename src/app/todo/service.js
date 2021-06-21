const { ToDo } = require("../../database/models");
const { Exception, errors } = require("../../utils");
const _ = require("lodash");

class todo {
    static async add(body, token) {
        const completed = body.completed || false;
        const title = body.title || body.data.slice(0, 5) + "...";
        const todo = new ToDo({ userId: token._id, title: title, data: body.data, completed: completed }).save();
        if (!todo) throw new Exception(errors.Item_Not_Created);
        return todo;
    };
    static async find(id, token) {
        const result = await ToDo.findById(id);
        if (!result) throw new Exception(errors.Item_Not_Found);
        if (result.userId.toString() != token._id.toString()) throw new Exception(errors.Unauthorized);
        return _.omit(result.toObject(), "__v");
    };
    static async delete(id, token) {
        const item = await ToDo.findById(id);
        if (!item) throw new Exception(errors.Item_Not_Found);
        if (item.userId.toString() != token._id.toString()) throw new Exception(errors.Unauthorized);
        await ToDo.deleteOne({ _id: id });
    };
    static async update(body, token) {
        const item = await ToDo.findById(body.id);
        if (!item) throw new Exception(errors.Item_Not_Found);
        if (item.userId.toString() != token._id.toString()) throw new Exception(errors.Unauthorized);
        let { title, data, completed } = body;
        const date = Date.now();
        if (!title) title = item.title;
        if (!data) data = item.data;
        if (!completed) completed = item.completed;
        const result = await ToDo.findByIdAndUpdate(body.id, { title: title, data, date: date, completed: completed }, { new: true });
        return result;
    }
}

module.exports = todo