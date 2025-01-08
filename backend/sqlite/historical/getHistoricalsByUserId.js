import initDatabase from "../config.js";

export const getHistoricalsByUserId = (userId) => {
    const db = initDatabase();
    const stmt = db.prepare(`
        SELECT * FROM Historicals WHERE user_id = ?
        ORDER BY created_at DESC;
    `);

    try {
        return stmt.all(userId);
    } catch (err) {
        console.error('Erreur lors de la récupération des historiques:', err.message);
        return [];
    }
};
