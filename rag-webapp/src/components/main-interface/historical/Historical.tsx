import React, { useState, useEffect } from "react";
// @ts-ignore
import "../../../css/main-interface/historical.css";
import { API_BACK_IP } from "../../../global";

export function Historical({
    userId,
    onChatSelected,
}: Readonly<{
    userId: number;
    onChatSelected: (historicalId: number, messages: { sender: "user" | "bot"; text: string }[]) => void;
}>) {
    const [chats, setChats] = useState<{ id: number; label: string }[]>([]);
    const [activeChatId, setActiveChatId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://${API_BACK_IP}:5000/api/historicals/${userId}`);
                const data = await response.json();

                if (data.message && data.message === "Aucun historique trouvé.") {
                    setChats([]);
                } else if (Array.isArray(data) && data.length > 0) {
                    const formattedChats = data.map((chat: { id: number; created_at: string }) => ({
                        id: chat.id,
                        label: `New chat - Créé le ${new Date(chat.created_at).toLocaleString()}`,
                    }));
                    setChats(formattedChats);
                } else {
                    setError("Aucun historique trouvé.");
                }
            } catch (error: any) {
                setError("Une erreur est survenue. Veuillez réessayer.");
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChats();
    }, [userId]);

    const handleChatClick = async (chatId: number) => {
        setActiveChatId(chatId);
        const response = await fetch(`http://${API_BACK_IP}:5000/api/chats/${chatId}/messages`);

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
            const response = await fetch(`http://${API_BACK_IP}:5000/api/chats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création d’un nouveau chat");
            }

            const data = await response.json();
            const newChat = { id: data.chat.id, label: `New chat - Créé maintenant` };

            setChats((prevChats) => [...prevChats, newChat]);
            setActiveChatId(newChat.id);

            const messagesResponse = await fetch(`http://${API_BACK_IP}:5000/api/chats/${newChat.id}/messages`);
            if (!messagesResponse.ok) {
                console.error("Erreur lors de la récupération des messages");
                return;
            }

            const messages = await messagesResponse.json();
            onChatSelected(newChat.id, messages);
        } catch (error: any) {
            console.error(error.message);
            setError("Une erreur est survenue lors de la création du chat.");
        }
    };

    const handleDeleteChat = async (chatId: number) => {
        setError(null);

        try {
            const response = await fetch(`http://${API_BACK_IP}:5000/api/historicals/${chatId}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du chat");
            }

            setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
            if (activeChatId === chatId) {
                setActiveChatId(null);
            }
        } catch (error: any) {
            setError("Une erreur est survenue lors de la suppression du chat.");
            console.error("Erreur lors de la suppression du chat:", error.message);
        }
    };

    let chatContent;
    if (error) {
        chatContent = <div className="error-message">{error}</div>;
    } else if (isLoading) {
        chatContent = <div className="loading-message">Chargement...</div>;
    } else if (chats.length === 0) {
        chatContent = (
            <div className="no-chats-message">
                <h2>Oups ! 😭</h2>
                <p>Vous n'avez pas de chat, créez-en un.</p>
            </div>
        );
    } else {
        chatContent = (
            <div className="historical-chats">
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        className={`chat-item ${activeChatId === chat.id ? "selected" : ""}`}
                        onClick={() => handleChatClick(chat.id)}
                    >
                        {chat.label}
                        <button
                            className="delete-chat-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChat(chat.id);
                            }}
                        >
                            Supprimer
                        </button>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="historical-container">
            <div className="historical-header">
                <h4 className="historical-h4">Historique des demandes</h4>
                <button className="new-chat-button" onClick={handleNewChat}>
                    Nouveau chat
                </button>
            </div>
            {chatContent}
        </div>
    );
}
