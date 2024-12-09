import React, { useState, useEffect } from "react";
// @ts-ignore
import "../../../css/main-interface/historical.css";

export function Historical({
                               userId,
                               onChatSelected,
                           }: {
    userId: number;
    onChatSelected: (historicalId: number, messages: { sender: "user" | "bot"; text: string }[]) => void;
}) {
    const [chats, setChats] = useState<{ id: number; label: string }[]>([]);
    const [activeChatId, setActiveChatId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:5000/api/historicals/${userId}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des historiques");
                }

                const data = await response.json();

                if (data && Array.isArray(data)) {
                    const formattedChats = data.map((chat: { id: number; created_at: string }) => ({
                        id: chat.id,
                        label: `Chat #${chat.id} - Créé le ${new Date(chat.created_at).toLocaleString()}`,
                    }));
                    setChats(formattedChats);
                } else {
                    throw new Error("Aucun historique trouvé.");
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChats();
    }, [userId]);

    const handleChatClick = async (chatId: number) => {
        setActiveChatId(chatId);

        const response = await fetch(`http://localhost:5000/api/chats/${chatId}/messages`);
        if (!response.ok) {
            console.error("Erreur lors de la récupération des messages");
            return;
        }
        const messages = await response.json();
        onChatSelected(chatId, messages);
    };


    const handleNewChat = async () => {
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/api/chats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création d’un nouveau chat");
            }

            const data = await response.json();
            const newChat = {
                id: data.chat.id,
                label: `Chat #${data.chat.id} - Créé maintenant`,
            };

            setChats((prevChats) => [...prevChats, newChat]);
            setActiveChatId(newChat.id);
            const messagesResponse = await fetch(`http://localhost:5000/api/chats/${newChat.id}/messages`);
            if (!messagesResponse.ok) {
                console.error("Erreur lors de la récupération des messages");
                return;
            }

            const messages = await messagesResponse.json();
            onChatSelected(newChat.id, messages);
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
            {error && <div className="error-message">{error}</div>}
            <div className="historical-chats">
                {isLoading ? (
                    <div className="loading-message">Chargement...</div>
                ) : (
                    chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`chat-item ${activeChatId === chat.id ? "selected" : ""}`}
                            onClick={() => handleChatClick(chat.id)}
                        >
                            {chat.label}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
