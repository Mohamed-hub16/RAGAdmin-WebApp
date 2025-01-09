import express from 'express';
import crypto from 'crypto';
import { addUser } from '../sqlite/users/addUser.js';
import { getUserByIdentifiant } from '../sqlite/users/getUser.js';

const router = express.Router();

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) return reject(err);
            resolve(`${salt}:${derivedKey.toString('hex')}`);
        });
    });
}

async function verifyPassword(password, hashedPassword) {
    const [salt, storedHash] = hashedPassword.split(':');
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) return reject(err);
            const computedHash = derivedKey.toString('hex');
            resolve(computedHash === storedHash);
        });
    });
}
router.post('/register', async (req, res) => {
    const { identifiant, password } = req.body;

    try {
        const existingUser = await getUserByIdentifiant(identifiant);
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà enregistré.' });
        }

        const hashedPassword = await hashPassword(password);

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

        console.log(`Mot de passe enregistré pour ${identifiant}: ${user.password}`);

        const isPasswordValid = await verifyPassword(password, user.password);
        console.log(`Résultat de la vérification : ${isPasswordValid}`);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        res.status(200).json({
            user: { id: user.id, identifiant: user.identifiant }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
});

export default router;
