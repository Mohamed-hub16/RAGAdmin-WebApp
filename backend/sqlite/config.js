import Database from 'better-sqlite3';

const initDatabase = () => {
    const db = new Database('./sqlite/database.sqlite');
    console.log('Connexion à la base de données SQLite réussie.');
    return db;
};

export default initDatabase;