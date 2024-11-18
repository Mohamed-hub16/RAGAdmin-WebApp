import React, { useState } from "react";
// @ts-ignore
import "../../../css/main-interface/historical.css";

export function Historical() {
    const chats = [
        "Problème sur le scanneur de QRCode",
        "Erreur de connexion réseau",
        "Impossible de lancer l'application",
        "Bug dans le formulaire",
        "Données manquantes dans le tableau",
        "Problème sur le scanneur de QRCode",
    ];

    const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);

    const handleChatClick = (index: number) => {
        setActiveChatIndex(index);
    };

    return (
        <div className="historical-container">
            <h4 className="historical-h4">Historique des demandes</h4>
            <div className="historical-chats">
                {chats.map((chat, index) => (
                    <div
                        key={index}
                        className={`chat-item ${
                            activeChatIndex === index ? "selected" : ""
                        }`}
                        onClick={() => handleChatClick(index)}
                    >
                        {chat}
                    </div>
                ))}
            </div>
        </div>
    );
}
