import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./sqlite/database.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

export default db;
