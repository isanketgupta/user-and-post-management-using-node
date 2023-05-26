const express = require('express');
// const { body } = require('express-validator/check');
const { check, validationResult } = require('express-validator');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/getPosts', isAuth, feedController.getPosts);

router.get('/getPostCount', isAuth, feedController.getPostCount);

router.post(
  '/post',
  isAuth,
  [
    check('title').trim().not().isEmpty(),
    check('Body').trim().not().isEmpty(),
    check('active').isBoolean().withMessage('active must be a boolean value'),
    check('latitude').trim().not().isEmpty(),
    check('longitude').trim().not().isEmpty(),
  ],
  feedController.createPost
);

router.post(
    '/getByLocation',
    [
        check('latitude').trim().not().isEmpty(),
        check('longitude').trim().not().isEmpty(),
    ], 
    isAuth, 
    feedController.getByLocation
    );

router.put(
  '/updatePost/:postId',
  isAuth,
  [
    check('title')
      .trim()
      .isLength({ min: 5 }),
    check('Body')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.updatePost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;