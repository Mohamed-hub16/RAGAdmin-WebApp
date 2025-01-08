import initDatabase from "../config.js";

export const addHistorical = (userId) => {
    const db = initDatabase();
    const stmt = db.prepare(`
        INSERT INTO Historicals (user_id)
        VALUES (?);
    `);

    try {
        const result = stmt.run(userId);
        console.log(`Nouvelle session d’historique créée pour l'utilisateur ID : ${userId}`);
        return result.lastInsertRowid;
    } catch (err) {
        console.error('Erreur lors de l’ajout de la session d’historique:', err.message);
        return null;
    }
};
