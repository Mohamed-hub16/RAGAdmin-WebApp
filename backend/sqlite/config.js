import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initDatabase = async () => {
    const db = await open({
        filename: './sqlite/database.db',
        driver: sqlite3.Database,
    });

    console.log('Connexion à la base de données SQLite réussie.');
    return db;
};

export default initDatabase;
