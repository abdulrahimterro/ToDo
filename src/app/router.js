const router = require("express").Router();
const { catchAsync } = require("../utils");

router.use("/user", require("./user/router"));
router.use(catchAsync(require("./user/controller").authorization));
router.use("/todo", require("./todo/router"));

module.exports = router