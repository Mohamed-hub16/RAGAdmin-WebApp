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

export const getUserById = async (id) => {
    const db = await initDatabase();
    const query = `
        SELECT id, identifiant
        FROM User
        WHERE id = ?;
    `;

    try {
        const user = await db.get(query, [id]);
        return user || null;
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err.message);
        throw err;
    } finally {
        await db.close();
    }
};