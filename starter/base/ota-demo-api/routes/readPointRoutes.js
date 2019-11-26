const express = require("express");
const readPointController = require("../controllers/readPointController");

const router = express.Router();

router.route(`/`).get(readPointController.getAll);

module.exports = router;
