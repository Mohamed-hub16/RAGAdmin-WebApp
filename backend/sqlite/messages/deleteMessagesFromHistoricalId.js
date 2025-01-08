import initDatabase from "../config.js";

export const deleteMessagesFromHistoricalId = (historicalId) => {
    const db = initDatabase();
    const deleteSQL = `
    DELETE FROM Messages WHERE historical_id = ?;
  `;

    try {
        const result = db.prepare(deleteSQL).run(historicalId);

        if (result.changes === 0) {
            console.log(`Aucun message trouvé avec l'ID historique : ${historicalId}`);
            return false;
        }

        console.log(`Messages liés à l'ID historique ${historicalId} supprimés avec succès.`);
        return true;
    } catch (err) {
        console.error('Erreur lors de la suppression des messages:', err.message);
        return false;
    }
};