import { getHistoricalsByUserId } from "../sqlite/historical/getHistoricalsByUserId.js";
import { deleteMessagesFromHistoricalId } from "../sqlite/messages/deleteMessagesFromHistoricalId.js";
import { addHistorical } from "../sqlite/historical/addHistorical.js";
import express from "express";
import { deleteHistorical } from "../sqlite/historical/deleteHistorical.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'UserId est requis.' });
    }

    try {
        const historicalId = await addHistorical(userId);
        res.status(201).json({
            message: 'Historique créé avec succès.',
            historical: { id: historicalId, user_id: userId }
        });
    } catch (err) {
        console.error('Erreur lors de la création de l\'historique:', err);
        res.status(500).json({ message: 'Erreur lors de la création de l\'historique.' });
    }
});

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const historicals = await getHistoricalsByUserId(userId);

        if (!historicals || historicals.length === 0) {
            return res.status(404).json({ message: 'Aucun historique trouvé pour cet utilisateur.' });
        }

        res.status(200).json(historicals);
    } catch (err) {
        console.error('Erreur lors de la récupération des historiques:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des historiques.' });
    }
});

router.delete('/:historicalId', async (req, res) => {
    const { historicalId } = req.params;

    try {
        await deleteMessagesFromHistoricalId(historicalId);
        const successDeleteHistorical = await deleteHistorical(historicalId);

        if (successDeleteHistorical) {
            return res.status(200).json({ message: 'Historique supprimé avec succès.' });
        } else {
            return res.status(404).json({ message: 'Historique introuvable.' });
        }
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'historique:', err);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'historique.' });
    }
});

export default router;
