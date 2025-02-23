// Defines routes for user-related operations

const express = require('express');
const { signup, login } = require('../controllers/users-controller');

const router = express.Router();

/**
 * @route POST /api/users/signup
 * @desc Register a new user
 * @access Public
 */
router.post('/signup', signup);

/**
 * @route POST /api/users/login
 * @desc Login a user
 * @access Public
 */
router.post('/login', login);

module.exports = router;