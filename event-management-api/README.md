````markdown
# Event Management API

This project is a Node.js REST API for managing events and users. It allows users to create, read, update, and delete events, as well as register and authenticate users. The API uses MySQL as the database and includes JWT-based authentication.

## Requirements

- Node.js
- npm (Node Package Manager)
- MySQL

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/event-management-api.git
   cd event-management-api
   ```
````

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=event_management
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```sh
   npm run start
   ```

## Code Structure

The project structure is as follows:

```

```

```
event-management-api/
├── controllers/
│   ├── events-controller.js
│   └── users-controller.js
├── models/
│   ├── event.js
│   └── user.js
├── routes/
│   ├── events.js
│   └── users.js
├── util/
│   ├── auth.js
│   └── upload.js
├── config.js
├── database.js
├── test-api.js
├── .env
├── app.js
├── package.json
└── README.md
```

````

### Explanation of Each File

- **controllers/**: Contains the logic for handling requests and responses.

  - `events-controller.js`: Handles event-related operations.
  - `users-controller.js`: Handles user-related operations.

- **models/**: Contains the database models.

  - `event.js`: Defines the Event model and database interactions.
  - `user.js`: Defines the User model and database interactions.

- **routes/**: Contains the route definitions.

  - `events.js`: Defines routes for event-related operations.
  - `users.js`: Defines routes for user-related operations.

- **util/**: Contains utility functions.

  - `auth.js`: Middleware for JWT authentication.
  - `upload.js`: Handles file uploads.

- **config.js**: Configuration settings for the application.

- **database.js**: Database connection and setup.

- **test-api.js**: Script for testing the API endpoints.

- **.env**: Environment variables configuration file.

- **app.js**: The main application file that sets up the Express server and routes.

- **package.json**: Contains the project metadata and dependencies.

- **README.md**: Project documentation.

## API Endpoints

### User Endpoints

- **Register a new user**

  ```http
  POST /api/users/signup
  Content-Type: application/json

  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
````

- **Login a user**

  ```http
  POST /api/users/login
  Content-Type: application/json

  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### Event Endpoints

- **Create an event**

  ```http
  POST /api/events
  Content-Type: application/json
  Authorization: Bearer <token>

  {
    "title": "Test Event",
    "description": "This is a test event",
    "address": "123 Test St",
    "date": "2025-02-22 10:00:00",
    "image": "test.jpg"
  }
  ```

- **Get an event by ID**

  ```http
  GET /api/events/:id
  Authorization: Bearer <token>
  ```

- **Get all events**

  ```http
  GET /api/events
  Authorization: Bearer <token>
  ```

- **Update an event**

  ```http
  PUT /api/events/:id
  Content-Type: application/json
  Authorization: Bearer <token>

  {
    "title": "Updated Event",
    "description": "This is an updated test event",
    "address": "123 Updated St",
    "date": "2025-02-23 10:00:00",
    "image": "updated.jpg"
  }
  ```

- **Delete an event**

  ```http
  DELETE /api/events/:id
  Authorization: Bearer <token>
  ```

## Running Tests

You can run the provided `test-api.js` script to test the API endpoints. The script covers various scenarios, including multiple user accounts, multiple events, and various operations on events.

1. Ensure the server is running:

   ```sh
   npm run start
   ```

2. Run the test script:

   ```sh
   node test-api.js
   ```

### Test Scenarios

- User registration and login
- Creating multiple events for multiple users
- Getting events by ID
- Getting all events
- Updating events
- Deleting an event
- Invalid login
- Creating an event without authentication
- Updating a non-existent event
- Deleting a non-existent event

### Use Case 1: User Signup

1. **Client Request**: A client sends a POST request to the server at `/api/users/signup` with user details (username, email, password).
2. **Router**: The request is routed to the appropriate route handler in `routes/users.js`.
3. **Controller**: The route handler calls the `signup` function in `controllers/users-controller.js`.
4. **Model**: The `signup` function interacts with the `User` model in `models/user.js` to save the new user to the database.
5. **Database**: The `User` model uses Sequelize to interact with the MySQL database and save the user.
6. **Response**: The controller sends a response back to the client with a success message or an error message.

### Use Case 2: User Login

1. **Client Request**: A client sends a POST request to the server at `/api/users/login` with user credentials (email, password).
2. **Router**: The request is routed to the appropriate route handler in `routes/users.js`.
3. **Controller**: The route handler calls the `login` function in `controllers/users-controller.js`.
4. **Model**: The `login` function interacts with the `User` model in `models/user.js` to find the user and verify the password.
5. **Database**: The `User` model uses Sequelize to interact with the MySQL database and find the user.
6. **Response**: The controller sends a response back to the client with a success message and a token or an error message.

### Use Case 3: Create Event

1. **Client Request**: A client sends a POST request to the server at `/api/events` with event details (title, description, address, date, image).
2. **Router**: The request is routed to the appropriate route handler in `routes/events.js`.
3. **Controller**: The route handler calls the `createEvent` function in `controllers/events-controller.js`.
4. **Model**: The `createEvent` function interacts with the `Event` model in `models/event.js` to save the new event to the database.
5. **Database**: The `Event` model uses Sequelize to interact with the MySQL database and save the event.
6. **Response**: The controller sends a response back to the client with a success message or an error message.

### Use Case 4: Get Event by ID

1. **Client Request**: A client sends a GET request to the server at `/api/events/:id` with the event ID.
2. **Router**: The request is routed to the appropriate route handler in `routes/events.js`.
3. **Controller**: The route handler calls the `getEventById` function in `controllers/events-controller.js`.
4. **Model**: The `getEventById` function interacts with the `Event` model in `models/event.js` to find the event by ID.
5. **Database**: The `Event` model uses Sequelize to interact with the MySQL database and find the event.
6. **Response**: The controller sends a response back to the client with the event details or an error message.

### Use Case 5: Update Event

1. **Client Request**: A client sends a PUT request to the server at `/api/events/:id` with updated event details (title, description, address, date, image).
2. **Router**: The request is routed to the appropriate route handler in `routes/events.js`.
3. **Controller**: The route handler calls the `updateEvent` function in `controllers/events-controller.js`.
4. **Model**: The `updateEvent` function interacts with the `Event` model in `models/event.js` to update the event in the database.
5. **Database**: The `Event` model uses Sequelize to interact with the MySQL database and update the event.
6. **Response**: The controller sends a response back to the client with a success message or an error message.

### Use Case 6: Delete Event

1. **Client Request**: A client sends a DELETE request to the server at `/api/events/:id` with the event ID.
2. **Router**: The request is routed to the appropriate route handler in `routes/events.js`.
3. **Controller**: The route handler calls the `deleteEvent` function in `controllers/events-controller.js`.
4. **Model**: The `deleteEvent` function interacts with the `Event` model in `models/event.js` to delete the event from the database.
5. **Database**: The `Event` model uses Sequelize to interact with the MySQL database and delete the event.
6. **Response**: The controller sends a response back to the client with a success message or an error message.

This flow ensures a clear separation of concerns, making the codebase easier to maintain and extend.

## License

This project is licensed under the MIT License.

```

```
