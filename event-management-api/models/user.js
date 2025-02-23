const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

class User {
    static async create({ username, email, password }) {
        try {
            const hashedPassword = bcrypt.hashSync(password, 8);
            const [result] = await pool.query(`
                INSERT INTO users (username, email, password)
                VALUES (?, ?, ?)
            `, [username, email, hashedPassword]);
            return result.insertId;
        } catch (error) {
            console.error('Error creating user in database:', error); // Log the error
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM users WHERE email = ?
            `, [email]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error); // Log the error
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.query(`
                SELECT * FROM users WHERE id = ?
            `, [id]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by ID:', error); // Log the error
            throw error;
        }
    }

    static async findByCredentials(email, password) {
        try {
            const user = await this.findByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            return user;
        } catch (error) {
            console.error('Error finding user by credentials:', error); // Log the error
            throw error;
        }
    }
}

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

/**
 * Creates a new user.
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The hashed password of the user.
 * @returns {Object} The created user.
 */
const createUser = async (username, email, password) => {
    const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    return { id: result.insertId, username, email };
};

/**
 * Retrieves a user by their email.
 * @param {string} email - The email of the user.
 * @returns {Object} The user.
 */
const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

module.exports = { signup, login, User, getUserByEmail, createUser };