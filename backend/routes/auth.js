import express from 'express';
import bcrypt from 'bcrypt';
import { addUser } from '../sqlite/users/addUser.js';
import { getUserByIdentifiant } from '../sqlite/users/getUser.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { identifiant, password } = req.body;

    try {
        const existingUser = await getUserByIdentifiant(identifiant);
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà enregistré.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await addUser(identifiant, hashedPassword);

        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur lors de l’inscription.' });
    }
});

router.post('/login', async (req, res) => {
    const { identifiant, password } = req.body;

    try {
        const user = await getUserByIdentifiant(identifiant);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        res.status(200).json({ message: 'Connexion réussie.', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
});

export default router;
