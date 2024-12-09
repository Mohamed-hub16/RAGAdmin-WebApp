import initDatabase from "../config.js";

export const addHistorical = async (userId) => {
    const db = await initDatabase();
    const insertSQL = `
    INSERT INTO Historicals (user_id)
    VALUES (?);
  `;

    try {
        const result = await db.run(insertSQL, [userId]);
        console.log(`Nouvelle session d’historique créée pour l'utilisateur ID : ${userId}`);
        return result.lastID;
    } catch (err) {
        console.error('Erreur lors de l’ajout de la session d’historique:', err.message);
        return null;
    } finally {
        await db.close();
    }
};
