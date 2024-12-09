import React, { useState, useEffect } from "react";
// @ts-ignore
import "../../../css/main-interface/historical.css";

export function Historical({ userId }: { userId: number }) {
    const [chats, setChats] = useState<string[]>([]);
    const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:5000/api/historicals/${userId}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des historiques');
                }

                const data = await response.json();

                if (data && Array.isArray(data)) {
                    const formattedChats = data.map(
                        (chat: { id: number; created_at: string }) =>
                            `Chat #${chat.id} - Créé le ${new Date(chat.created_at).toLocaleString()}`
                    );
                    setChats(formattedChats);
                } else {
                    throw new Error('Aucun historique trouvé.');
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChats();
    }, [userId]);

    const handleChatClick = (index: number) => {
        setActiveChatIndex(index);
    };

    const handleNewChat = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création d’un nouveau chat');
            }

            const data = await response.json();
            const newChatDescription = `Chat #${data.chat.id} - Créé maintenant`;

            setChats((prevChats) => [...prevChats, newChatDescription]);
            setActiveChatIndex(chats.length);
        } catch (error: any) {
            console.error(error.message);
            setError(error.message);
        }
    };

    return (
        <div className="historical-container">
            <div className="historical-header">
                <h4 className="historical-h4">Historique des demandes</h4>
                <button className="new-chat-button" onClick={handleNewChat}>
                    Nouveau chat
                </button>
            </div>
            {error && <div className="error-message">{error}</div>}  {/* Afficher l'erreur s'il y en a une */}
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
