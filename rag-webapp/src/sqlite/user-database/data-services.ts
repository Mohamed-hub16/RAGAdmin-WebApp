import db from '../config';

export const createUserTable = () => {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identifiant TEXT NOT NULL UNIQUE,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      photo_profil TEXT
    );
  `;

    db.run(createTableSQL, (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table User:', err.message);
        } else {
            console.log('Table User créée ou déjà existante.');
        }
    });
};