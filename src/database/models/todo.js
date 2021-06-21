const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    title: { type: String, required: true },
    data: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = todo = mongoose.model("todo", todoSchema);