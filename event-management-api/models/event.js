// Defines the Event model and database interactions

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

/**
 * Creates a new event.
 * @param {string} title - The title of the event.
 * @param {string} description - The description of the event.
 * @param {string} address - The address of the event.
 * @param {string} date - The date of the event.
 * @param {string} image - The image of the event.
 * @returns {Object} The created event.
 */
const createEvent = async (title, description, address, date, image) => {
    const [result] = await pool.query('INSERT INTO events (title, description, address, date, image) VALUES (?, ?, ?, ?, ?)', [title, description, address, date, image]);
    return { id: result.insertId, title, description, address, date, image };
};

/**
 * Retrieves an event by its ID.
 * @param {number} id - The ID of the event.
 * @returns {Object} The event.
 */
const getEventById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    return rows[0];
};

/**
 * Retrieves all events.
 * @returns {Array} The list of events.
 */
const getAllEvents = async () => {
    const [rows] = await pool.query('SELECT * FROM events');
    return rows;
};

/**
 * Updates an event.
 * @param {number} id - The ID of the event.
 * @param {string} title - The title of the event.
 * @param {string} description - The description of the event.
 * @param {string} address - The address of the event.
 * @param {string} date - The date of the event.
 * @param {string} image - The image of the event.
 * @returns {Object|null} The updated event or null if not found.
 */
const updateEvent = async (id, title, description, address, date, image) => {
    const [result] = await pool.query('UPDATE events SET title = ?, description = ?, address = ?, date = ?, image = ? WHERE id = ?', [title, description, address, date, image, id]);
    if (result.affectedRows === 0) return null;
    return { id, title, description, address, date, image };
};

/**
 * Deletes an event.
 * @param {number} id - The ID of the event.
 * @returns {Object|null} The deleted event or null if not found.
 */
const deleteEvent = async (id) => {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [id]);
    if (result.affectedRows === 0) return null;
    return { id };
};

module.exports = { createEvent, getEventById, getAllEvents, updateEvent, deleteEvent };