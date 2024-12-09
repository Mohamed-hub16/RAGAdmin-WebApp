import { getHistoricalsByUserId } from "../sqlite/historical/getHistoricalsByUserId.js";
import express from "express";

const router = express.Router();

export default router.get('/:userId', async (req, res) => {
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
