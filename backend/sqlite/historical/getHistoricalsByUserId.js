import initDatabase from "../config.js";

export const getHistoricalsByUserId = async (userId) => {
    const db = await initDatabase();
    const selectSQL = `
    SELECT * FROM Historicals WHERE user_id = ? ORDER BY created_at DESC;
  `;

    try {
        return await db.all(selectSQL, [userId]);
    } catch (err) {
        console.error('Erreur lors de la récupération des historiques:', err.message);
        return [];
    } finally {
        await db.close();
    }
};
