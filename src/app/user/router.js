const router = require("express").Router();
const controller = require("./controller");
const { catchAsync, joiValidator } = require("../../utils");
const validator = require("./validator");

router.post("/signup", joiValidator(validator.signup), catchAsync(controller.signup));
router.post("/login", joiValidator(validator.login), catchAsync(controller.login));

module.exports = router