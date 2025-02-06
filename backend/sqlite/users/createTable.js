import initDatabase from "../config.js";

export const createUserTable = async () => {
    const db = initDatabase();
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identifiant TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

    try {
        await db.exec(createTableSQL);
        console.log('Table User créée ou déjà existante.');
    } catch (err) {
        console.error('Erreur lors de la création de la table User:', err.message);
    }
};