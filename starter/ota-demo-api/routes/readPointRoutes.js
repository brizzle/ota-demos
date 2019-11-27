const express = require('express');
const readPointController = require('../controllers/readPointController');

const router = express.Router();

router
  .route(`/`)
  .get(readPointController.getAll)
  .post(readPointController.create);

router
  .route(`/:id`)
  .patch(readPointController.update)
  .delete(readPointController.delete);

module.exports = router;
