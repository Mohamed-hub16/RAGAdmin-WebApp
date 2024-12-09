import initDatabase from "../config.js";

export const getMessagesByHistoricalId = async (historicalId) => {
    const db = await initDatabase();
    const selectSQL = `
        SELECT sender, content, sent_at
        FROM Messages
        WHERE historical_id = ?
        ORDER BY sent_at ASC;
    `;

    try {
        const rows = await db.all(selectSQL, [historicalId]);
        return rows.map(row => ({
            sender: row.sender,
            text: row.content,
            sentAt: row.sent_at,
        }));
    } catch (err) {
        console.error('Erreur lors de la récupération des messages:', err.message);
        return [];
    } finally {
        await db.close();
    }
};
