import initDatabase from "../config.js";

export const addMessage = async (historicalId, sender, content) => {
    const db = await initDatabase();
    const insertSQL = `
    INSERT INTO Messages (historical_id, sender, content)
    VALUES (?, ?, ?);
  `;

    try {
        await db.run(insertSQL, [historicalId, sender, content]);
        console.log(`Message ajouté à l'historique ID : ${historicalId}`);
    } catch (err) {
        console.error('Erreur lors de l’ajout du message:', err.message);
    } finally {
        await db.close();
    }
};
