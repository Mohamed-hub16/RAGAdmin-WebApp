import express from 'express';
import {addHistorical} from "../sqlite/historical/addHistorical.js";
import {getMessagesByHistoricalId} from "../sqlite/messages/getMessagesByHistoricalId.js";

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    console.log('Fetching chats for userId:', userId);

    try {
        const chats = await getMessagesByHistoricalId(userId);

        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: 'Aucun historique trouvé.' });
        }

        res.status(200).json(chats);
    } catch (err) {
        console.error('Erreur lors de la récupération des historiques:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des historiques.', error: err.message });
    }
});


router.post('/', async (req, res) => {
    const { userId } = req.body;

    try {
        const newChatId = await addHistorical(userId);

        res.status(201).json({
            message: 'Nouveau chat créé avec succès.',
            chat: { id: newChatId, description: `Chat #${newChatId}` },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur lors de la création d’un nouveau chat.' });
    }
});

export default router;
