const { Router } = require("express");
const caseController = require("../controllers/case.controller");
const { validateToken } = require("../middlewares/validateToken");

const router = Router();

router.get("/", validateToken, caseController.getAllCase);

router.post("/", validateToken, caseController.createCase);

router.delete("/:id", validateToken, caseController.deleteCase);

module.exports = router;
