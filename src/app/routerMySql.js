const router = require("express").Router();
const { catchAsync } = require("../utils");

router.use("/user", require("./MySql/user/router"));
router.use(catchAsync(require("./MySql/user/controller").authorization));
router.use("/todo", require("./MySql/todo/router"));

module.exports = router