import initDatabase from "../config.js";

export const deleteMessagesFromHistoricalId = async (historicalId) => {
    const db = await initDatabase();
    const deleteSQL = `
    DELETE FROM Messages WHERE historical_id = ?;
  `;

    try {
        const result = await db.run(deleteSQL, [historicalId]);

        if (result.changes === 0) {
            console.log(`Aucun historique trouvé avec l'ID : ${historicalId}`);
            return false;
        }

        console.log(`Historique avec l'ID ${historicalId} supprimé avec succès.`);
        return true;
    } catch (err) {
        console.error('Erreur lors de la suppression de l’historique:', err.message);
        return false;
    } finally {
        await db.close();
    }
};
