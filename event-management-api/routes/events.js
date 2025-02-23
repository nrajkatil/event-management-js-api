// Defines routes for event-related operations

const express = require('express');
const { create, getById, getAll, update, remove } = require('../controllers/events-controller');
const auth = require('../util/auth');

const router = express.Router();

/**
 * @route POST /api/events
 * @desc Create a new event
 * @access Private
 */
router.post('/', auth, create);

/**
 * @route GET /api/events/:id
 * @desc Get an event by ID
 * @access Public
 */
router.get('/:id', getById);

/**
 * @route GET /api/events
 * @desc Get all events
 * @access Public
 */
router.get('/', getAll);

/**
 * @route PUT /api/events/:id
 * @desc Update an event
 * @access Private
 */
router.put('/:id', auth, update);

/**
 * @route DELETE /api/events/:id
 * @desc Delete an event
 * @access Private
 */
router.delete('/:id', auth, remove);

module.exports = router;