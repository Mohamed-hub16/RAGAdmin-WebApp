import initDatabase from "../config.js";

export const addMessage = (historicalId, sender, content) => {
    const db = initDatabase();
    const stmt = db.prepare(`
        INSERT INTO Messages (historical_id, sender, content, sent_at)
        VALUES (?, ?, ?, datetime('now'));
    `);

    try {
        stmt.run(historicalId, sender, content);
        console.log(`Message ajouté à l'historique ID : ${historicalId}`);
    } catch (err) {
        console.error('Erreur lors de l’ajout du message:', err.message);
    }
};
