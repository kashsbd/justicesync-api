const { Router } = require("express");
const clientController = require("../controllers/client.controller");
const { validateToken } = require("../middlewares/validateToken");

const router = Router();

router.get("/", validateToken, clientController.getAllClient);

router.post("/", validateToken, clientController.createClient);

router.delete("/:id", validateToken, clientController.deleteClient);

module.exports = router;
