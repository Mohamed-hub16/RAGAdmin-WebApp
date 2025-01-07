import express from 'express';
import {addHistorical} from "../sqlite/historical/addHistorical.js";
import {getMessagesByHistoricalId} from "../sqlite/messages/getMessagesByHistoricalId.js";
import {addMessage} from "../sqlite/messages/addMessages.js";

const router = express.Router();

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

router.get('/:historicalId/messages', async (req, res) => {
    const { historicalId } = req.params;

    try {
        const messages = await getMessagesByHistoricalId(historicalId);
        res.status(200).json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
    }
});

router.post('/messages', async (req, res) => {
    const { historicalId, sender, content } = req.body;

    if (!historicalId || !sender || !content) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    try {
        await addMessage(historicalId, sender, content);
        res.status(201).json({ message: 'Message ajouté avec succès.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erreur lors de l’ajout du message.' });
    }
});

export default router;
