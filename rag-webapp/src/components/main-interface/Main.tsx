import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import { Prompt } from "./prompt/prompt";
import "../../css/main-interface/main.css";
import { Historical } from "./historical/Historical";

export function Main() {
    const userId = Number(localStorage.getItem("userId"));
    const [selectedChatMessages, setSelectedChatMessages] = useState<
        { sender: "user" | "bot"; text: string }[]
    >([]);
    const [selectedHistoricalId, setSelectedHistoricalId] = useState<number | null>(null);

    useEffect(() => {
        if (selectedHistoricalId !== null) {
            const fetchMessages = async () => {
                try {
                    const response = await fetch(
                        `http://192.168.0.1:5000/api/chats/${selectedHistoricalId}/messages`
                    );
                    if (!response.ok) {
                        throw new Error("Erreur lors de la récupération des messages");
                    }
                    const messages = await response.json();
                    setSelectedChatMessages(messages);
                } catch (error) {
                    console.error("Erreur:", error);
                }
            };

            fetchMessages();
        }
    }, [selectedHistoricalId]);

    const handleChatSelected = (
        historicalId: number,
        messages: { sender: "user" | "bot"; text: string }[]
    ) => {
        setSelectedHistoricalId(historicalId);
        setSelectedChatMessages(messages);
    };

    return (
        <>
            <Header />
            <div className="main-container">
                <div className="left-side">
                    <Historical
                        userId={userId ?? 0}
                        onChatSelected={handleChatSelected}
                    />
                </div>
                <div className="right-side">
                    <Prompt
                        initialMessages={selectedChatMessages}
                        historicalId={selectedHistoricalId}
                    />
                </div>
            </div>
        </>
    );
}
