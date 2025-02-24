// Defines routes for event-related operations

const express = require('express');
const { create, getById, getAll, update, remove } = require('../controllers/events-controller');
const auth = require('../util/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

/**
 * @route POST /api/events
 * @desc Create a new event
 * @access Private
 */
router.post('/events', auth, upload.single('image'), create);

/**
 * @route GET /api/events/:id
 * @desc Get an event by ID
 * @access Public
 */
router.get('/events/:id', getById);

/**
 * @route GET /api/events
 * @desc Get all events
 * @access Public
 */
router.get('/events', getAll);

/**
 * @route PUT /api/events/:id
 * @desc Update an event
 * @access Private
 */
router.put('/events/:id', auth, upload.single('image'), update);

/**
 * @route DELETE /api/events/:id
 * @desc Delete an event
 * @access Private
 */
router.delete('/events/:id', auth, remove);

module.exports = router;