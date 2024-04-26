const { Router } = require("express");
const userController = require("../controllers/user.controller");
const { validateToken } = require("../middlewares/validateToken");

const router = Router();

router.get("/", validateToken, userController.getAllUser);

router.post("/", validateToken, userController.createUser);

router.delete("/:id", validateToken, userController.deleteUser);

module.exports = router;
