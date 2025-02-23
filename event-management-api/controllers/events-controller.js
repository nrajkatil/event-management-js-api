// Handles event-related operations

const { createEvent, getEventById, getAllEvents, updateEvent, deleteEvent } = require('../models/event');

/**
 * Creates a new event.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const create = async (req, res) => {
    const { title, description, address, date, image } = req.body;
    const event = await createEvent(title, description, address, date, image);
    res.status(201).json(event);
};

/**
 * Retrieves an event by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getById = async (req, res) => {
    const event = await getEventById(req.params.id);
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
};

/**
 * Retrieves all events.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAll = async (req, res) => {
    const events = await getAllEvents();
    res.json(events);
};

/**
 * Updates an event.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const update = async (req, res) => {
    const { title, description, address, date, image } = req.body;
    const event = await updateEvent(req.params.id, title, description, address, date, image);
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
};

/**
 * Deletes an event.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const remove = async (req, res) => {
    const event = await deleteEvent(req.params.id);
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
};

module.exports = { create, getById, getAll, update, remove };