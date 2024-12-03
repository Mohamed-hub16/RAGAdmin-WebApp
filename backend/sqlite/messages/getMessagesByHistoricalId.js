import initDatabase from "../config.js";

export const getMessagesByHistoricalId = async (historicalId) => {
    const db = await initDatabase();
    const selectSQL = `
    SELECT * FROM Messages WHERE historical_id = ? ORDER BY sent_at ASC;
  `;

    try {
        return await db.all(selectSQL, [historicalId]);
    } catch (err) {
        console.error('Erreur lors de la récupération des messages:', err.message);
        return [];
    } finally {
        await db.close();
    }
};
