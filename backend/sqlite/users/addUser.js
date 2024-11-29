import initDatabase from "../config.js";

export const addUser = async (identifiant, password) => {
    const db = await initDatabase();
    const insertSQL = `
    INSERT INTO User (identifiant, password)
    VALUES (?, ?);
  `;

    try {
        await db.run(insertSQL, [identifiant, password || '']);
        console.log(`Utilisateur ajouté : ${identifiant}`);
    } catch (err) {
        console.error('Erreur lors de l’ajout de l’utilisateur:', err.message);
    } finally {
        await db.close();
    }
};