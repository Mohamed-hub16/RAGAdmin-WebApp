import initDatabase from '../config.js';

export const getUserByIdentifiant = async (identifiant) => {
    const db = await initDatabase();
    const selectSQL = `
    SELECT * FROM User WHERE identifiant = ?;
  `;

    try {
        return await db.get(selectSQL, [identifiant]);
    } catch (err) {
        console.error('Erreur lors de la récupération de l’utilisateur:', err.message);
        return null;
    } finally {
        await db.close();
    }
};