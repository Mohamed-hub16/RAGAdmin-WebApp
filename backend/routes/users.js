import express from "express";
import { getUserById } from "../sqlite/users/getUser.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err.message);
        res.status(500).json({ message: "Erreur interne." });
    }
});

export default router;