const express = require('express');
// const { body } = require('express-validator/check');
const { check, validationResult } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    check('password')
      .trim()
      .isLength({ min: 5 }),
    check('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post(
    '/login',
    [
        check('email').trim().not().isEmpty(),
        check('password').trim().not().isEmpty()
    ],
    authController.login
    );

module.exports = router;
