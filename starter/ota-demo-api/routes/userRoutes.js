const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

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
