const { Router } = require("express");
const timeEntryController = require("../controllers/timeentry.controller");
const { validateToken } = require("../middlewares/validateToken");

const router = Router();

router.get("/", validateToken, timeEntryController.getAllTimeEntry);

router.post("/", validateToken, timeEntryController.createTimeEntry);

router.delete("/:id", validateToken, timeEntryController.deleteTimeEntry);

module.exports = router;
