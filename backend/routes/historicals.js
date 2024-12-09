import { getHistoricalsByUserId } from "../sqlite/historical/getHistoricalsByUserId.js";
import express from "express";
import {deleteHistorical} from "../sqlite/historical/deleteHistorical.js";

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    console.log('Fetching historicals for userId:', userId);

    try {
        const historicals = await getHistoricalsByUserId(userId);

        console.log("Historicals fetched:", historicals);

        if (!historicals || historicals.length === 0) {
            console.log("No historicals found.");
            return res.status(404).json({ message: 'Aucun historique trouvé.' });
        }

        res.status(200).json(historicals);
    } catch (err) {
        console.error('Erreur lors de la récupération des historiques:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des historiques.', error: err.message });
    }
});

router.delete('/:historicalId', async (req, res) => {
    const { historicalId } = req.params;

    console.log('Deleting historical with ID:', historicalId);

    try {
        const success = await deleteHistorical(historicalId);

        if (success) {
            console.log(`Historique avec l'ID ${historicalId} supprimé avec succès.`);
            return res.status(200).json({ message: `Historique avec l'ID ${historicalId} supprimé avec succès.` });
        } else {
            console.log(`Aucun historique trouvé avec l'ID ${historicalId}`);
            return res.status(404).json({ message: `Aucun historique trouvé avec l'ID ${historicalId}.` });
        }
    } catch (err) {
        console.error('Erreur lors de la suppression de l’historique:', err);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'historique.', error: err.message });
    }
});

export default router;

