import express from "express";
import axios from "axios";

const router = express.Router();
const LLM_API_URL = "http://192.168.0.1:8000";

// Route POST pour envoyer un prompt au LLM
router.post("/prompt", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Le champ 'prompt' est obligatoire." });
    }

    try {
        const llmResponse = await axios.post(
            LLM_API_URL,
            { prompt },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        
        if (llmResponse.data && llmResponse.data.response) {
            return res.status(200).json({ response: llmResponse.data.data });
        } else {
            return res.status(500).json({ error: "La réponse du modèle est mal formatée." });
        }
    } catch (err) {
        console.error("Erreur lors de la communication avec le LLM:", err.message);
        res.status(500).json({ error: "Erreur lors de la communication avec le LLM." });
    }
});

export default router;
