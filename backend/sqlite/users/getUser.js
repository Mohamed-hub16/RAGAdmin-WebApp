import initDatabase from '../config.js';

export const getUserByIdentifiant = (identifiant) => {
    const db = initDatabase();
    const stmt = db.prepare('SELECT * FROM User WHERE identifiant = ?');

    try {
        return stmt.get(identifiant) || null;
    } catch (err) {
        console.error('Erreur lors de la récupération de l’utilisateur:', err.message);
        return null;
    }
};

export const getUserById = (id) => {
    const db = initDatabase();
    const stmt = db.prepare('SELECT id, identifiant FROM User WHERE id = ?');

    try {
        const user = stmt.get(id);
        return user || null;
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err.message);
        throw err;
    }
};
