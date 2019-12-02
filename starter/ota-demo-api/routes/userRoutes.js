const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route(`/`)
  .get(userController.getAll)
  .post(userController.create);

router
  .route(`/:id`)
  .get(userController.get)
  .patch(userController.update)
  .delete(userController.delete);

module.exports = router;
