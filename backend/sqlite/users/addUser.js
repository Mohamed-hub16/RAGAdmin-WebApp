import initDatabase from "../config.js";

export const addUser = async (identifiant, password) => {
    const db = initDatabase();
    const insertSQL = `
    INSERT INTO User (identifiant, password)
    VALUES (?, ?);
  `;

    try {
        const stmt = db.prepare(insertSQL);
        const result = stmt.run(identifiant, password || '');
        console.log(`Utilisateur ajouté : ${identifiant}`);
        return result.lastInsertRowid; // Return the ID of the newly inserted user
    } catch (err) {
        console.error('Erreur lors de l’ajout de l’utilisateur:', err.message);
        throw err; // Re-throw the error to handle it in the route
    }
};
