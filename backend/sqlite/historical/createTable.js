import initDatabase from "../config.js";

export const createUserTable = async () => {
    const db = await initDatabase();
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS Historicals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES User(id)
    );
  `;

    try {
        await db.exec(createTableSQL);
        console.log('Table User créée ou déjà existante.');
    } catch (err) {
        console.error('Erreur lors de la création de la table User:', err.message);
    } finally {
        await db.close();
    }
};
