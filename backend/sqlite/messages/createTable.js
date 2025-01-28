import initDatabase from "../config.js";

export const createMessagesTable = async () => {
    const db = initDatabase();
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS Messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      historical_id INTEGER NOT NULL,
      sender TEXT NOT NULL,
      content TEXT NOT NULL,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(historical_id) REFERENCES Historicals(id));
    `;

    try {
        await db.exec(createTableSQL);
        console.log('Table Messages créée ou déjà existante.');
    } catch (err) {
        console.error('Erreur lors de la création de la table User:', err.message);
    }
};
