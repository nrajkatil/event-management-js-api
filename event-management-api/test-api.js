const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const testApi = async () => {
    try {
        // User Registration for User 1
        let response = await axios.post('http://localhost:3000/api/users/signup', {
            username: 'testuser1',
            email: 'test1@example.com',
            password: 'password123'
        });
        console.log('User 1 Registration:', response.data);

        // User Login for User 1
        response = await axios.post('http://localhost:3000/api/users/login', {
            email: 'test1@example.com',
            password: 'password123'
        });
        console.log('User 1 Login:', response.data);
        const token1 = response.data.token;

        // User Registration for User 2
        response = await axios.post('http://localhost:3000/api/users/signup', {
            username: 'testuser2',
            email: 'test2@example.com',
            password: 'password123'
        });
        console.log('User 2 Registration:', response.data);

        // User Login for User 2
        response = await axios.post('http://localhost:3000/api/users/login', {
            email: 'test2@example.com',
            password: 'password123'
        });
        console.log('User 2 Login:', response.data);
        const token2 = response.data.token;

        // Create Events for User 1
        const createEvents = async (token, userId) => {
            const events = [];
            for (let i = 1; i <= 3; i++) {
                const form = new FormData();
                form.append('title', `Test Event ${i}`);
                form.append('description', `This is test event ${i}`);
                form.append('address', `123 Test St ${i}`);
                form.append('date', `2025-02-22 10:00:00`);
                form.append('image', fs.createReadStream(path.join(__dirname, 'test-image.jpg')));

                const response = await axios.post('http://localhost:3000/api/events', form, {
                    headers: {
                        ...form.getHeaders(),
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(`Create Event ${i} for User ${userId}:`, response.data);
                events.push(response.data.id);
            }
            return events;
        };

        const events1 = await createEvents(token1, 1);
        const events2 = await createEvents(token2, 2);
        const events = [...events1, ...events2];

        // Get Event by ID
        for (const eventId of events) {
            response = await axios.get(`http://localhost:3000/api/events/${eventId}`, {
                headers: { Authorization: `Bearer ${token1}` }
            });
            console.log(`Get Event by ID ${eventId}:`, response.data);
        }

        // Get All Events
        response = await axios.get('http://localhost:3000/api/events', {
            headers: { Authorization: `Bearer ${token1}` }
        });
        console.log('Get All Events:', response.data);

        // Update Events
        for (const eventId of events.slice(0, 3)) {
            response = await axios.put(`http://localhost:3000/api/events/${eventId}`, {
                title: `Updated Event ${eventId}`,
                description: `This is an updated test event ${eventId}`,
                address: `123 Updated St ${eventId}`,
                date: `2025-02-23 10:00:00`,
                image: `updated${eventId}.jpg`
            }, {
                headers: { Authorization: `Bearer ${token1}` }
            });
            console.log(`Update Event ${eventId}:`, response.data);
        }

        // Delete an Event
        const eventIdToDelete = events[0];
        response = await axios.delete(`http://localhost:3000/api/events/${eventIdToDelete}`, {
            headers: { Authorization: `Bearer ${token1}` }
        });
        console.log(`Delete Event ${eventIdToDelete}:`, response.data);

        // Additional Tests

        // Invalid Login
        try {
            response = await axios.post('http://localhost:3000/api/users/login', {
                email: 'invalid@example.com',
                password: 'wrongpassword'
            });
        } catch (error) {
            console.error('Invalid Login:', error.response ? error.response.data : error.message);
        }

        // Create Event without Authentication
        try {
            response = await axios.post('http://localhost:3000/api/events', {
                title: 'Unauthorized Event',
                description: 'This event should not be created',
                address: '123 Unauthorized St',
                date: '2025-02-22 10:00:00',
                image: 'unauthorized.jpg'
            });
        } catch (error) {
            console.error('Create Event without Authentication:', error.response ? error.response.data : error.message);
        }

        // Update Non-existent Event
        try {
            response = await axios.put('http://localhost:3000/api/events/9999', {
                title: 'Non-existent Event',
                description: 'This event does not exist',
                address: '123 Non-existent St',
                date: '2025-02-23 10:00:00',
                image: 'nonexistent.jpg'
            }, {
                headers: { Authorization: `Bearer ${token1}` }
            });
        } catch (error) {
            console.error('Update Non-existent Event:', error.response ? error.response.data : error.message);
        }

        // Delete Non-existent Event
        try {
            response = await axios.delete('http://localhost:3000/api/events/9999', {
                headers: { Authorization: `Bearer ${token1}` }
            });
        } catch (error) {
            console.error('Delete Non-existent Event:', error.response ? error.response.data : error.message);
        }

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

testApi();