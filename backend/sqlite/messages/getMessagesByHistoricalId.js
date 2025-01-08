import initDatabase from "../config.js";

export const getMessagesByHistoricalId = (historicalId) => {
    const db = initDatabase();
    const stmt = db.prepare(`
        SELECT sender, content, sent_at
        FROM Messages
        WHERE historical_id = ?
        ORDER BY sent_at ASC;
    `);

    try {
        const rows = stmt.all(historicalId);
        return rows.map(row => ({
            sender: row.sender,
            text: row.content,
            sentAt: row.sent_at,
        }));
    } catch (err) {
        console.error('Erreur lors de la récupération des messages:', err.message);
        return [];
    }
};
