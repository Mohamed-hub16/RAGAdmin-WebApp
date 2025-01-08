import initDatabase from "../config.js";

export const deleteHistorical = (historicalId) => {
    const db = initDatabase();
    const deleteSQL = `
    DELETE FROM Historicals WHERE id = ?;
  `;

    try {
        const result = db.prepare(deleteSQL).run(historicalId);

        if (result.changes === 0) {
            console.log(`Aucun historique trouvé avec l'ID : ${historicalId}`);
            return false;
        }

        console.log(`Historique avec l'ID ${historicalId} supprimé avec succès.`);
        return true;
    } catch (err) {
        console.error('Erreur lors de la suppression de l’historique:', err.message);
        return false;
    }
};