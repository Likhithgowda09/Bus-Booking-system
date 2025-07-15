const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'likhith@0902',
    database: 'bus booking system'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connection established');

    const createUsers = `
        CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255)
        )
    `;

    const createBuses = `
        CREATE TABLE IF NOT EXISTS Buses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            busNumber VARCHAR(50),
            totalSeats INT,
            availableSeats INT
        )
    `;

    const createBookings = `
        CREATE TABLE IF NOT EXISTS Bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT,
            busId INT,
            seatNumber INT,
            bookingDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES Users(id),
            FOREIGN KEY (busId) REFERENCES Buses(id)
        )
    `;

    const createPayments = `
        CREATE TABLE IF NOT EXISTS Payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            bookingId INT,
            amountPaid DECIMAL(10, 2),
            paymentStatus VARCHAR(50),
            paymentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (bookingId) REFERENCES Bookings(id)
        )
    `;

    // Run table creation queries one by one
    connection.query(createUsers, (err) => {
        if (err) throw err;
        console.log("Users table created");

        connection.query(createBuses, (err) => {
            if (err) throw err;
            console.log("Buses table created");

            connection.query(createBookings, (err) => {
                if (err) throw err;
                console.log("Bookings table created");

                connection.query(createPayments, (err) => {
                    if (err) throw err;
                    console.log("Payments table created");

                    connection.end(); // Close connection after all
                });
            });
        });
    });
});
