import React, { useState, useRef, useEffect } from "react";
import Envoyer from "../../../res/envoyer.png";
import "../../../css/main-interface/prompt.css";

interface Message {
    sender: "user" | "bot";
    text: string;
}

export function Prompt({
                           initialMessages,
                           historicalId,
                       }: {
    initialMessages: Message[];
    historicalId: number | null;
}) {
    const [messages, setMessages] = useState<Message[]>(initialMessages || []);
    const [userInput, setUserInput] = useState<string>("");
    const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessages(initialMessages || []);
    }, [initialMessages]);

    const saveMessageToDatabase = async (sender: "user" | "bot", text: string) => {
        if (!historicalId) return;

        try {
            const response = await fetch("http://localhost:5000/api/chats/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    historicalId,
                    sender,
                    content: text,
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'enregistrement du message.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        if (!userInput.trim() || isBotTyping) return;

        const userMessage = { sender: "user", text: userInput };
        // @ts-ignore
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        await saveMessageToDatabase("user", userInput);

        setUserInput("");
        setIsBotTyping(true);

        setTimeout(async () => {
            const botResponse = `Réponse du bot : ${userInput}`;
            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
            await saveMessageToDatabase("bot", botResponse);
            setIsBotTyping(false);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isBotTyping) {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${
                            message.sender === "user" ? "user-message" : "bot-message"
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Entrez votre texte ici..."
                    className="input-field"
                />
                <button
                    className="send-button"
                    onClick={handleSendMessage}
                    disabled={isBotTyping}
                >
                    <img className="img-send" src={Envoyer} alt="Envoyer" />
                </button>
            </div>
        </div>
    );
}
