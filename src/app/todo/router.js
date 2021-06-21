const router = require("express").Router();
const controller = require("../todo/controller");
const { joiValidator, catchAsync } = require("../../utils");
const validator = require("./validator");

router.post("/add", joiValidator(validator.add), catchAsync(controller.add));
router.get("/findAll", joiValidator(validator.find), catchAsync(controller.findAll));
router.get("/:id", catchAsync(controller.find));
router.delete("/:id", joiValidator(validator.delete), catchAsync(controller.delete));
router.patch("/update", joiValidator(validator.update), catchAsync(controller.update));

module.exports = router;