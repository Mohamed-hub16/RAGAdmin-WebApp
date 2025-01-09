import initDatabase from "../config.js";

export const addUser = async (identifiant, password) => {
    const db = initDatabase();
    const insertSQL = `
    INSERT INTO User (identifiant, password)
    VALUES (?, ?);
  `;

    try {
        const stmt = db.prepare(insertSQL);
        stmt.run(identifiant, password || '');
        console.log(`Utilisateur ajouté : ${identifiant}`);
    } catch (err) {
        console.error('Erreur lors de l’ajout de l’utilisateur:', err.message);
    }
};
