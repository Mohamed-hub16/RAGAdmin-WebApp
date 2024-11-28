import React, { useState, useRef, useEffect } from "react";
import Envoyer from "../../../res/envoyer.png";
import "../../../css/main-interface/prompt.css";

export function Prompt() {
    const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!userInput.trim() || isBotTyping) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: userInput },
        ]);

        setUserInput("");

        setIsBotTyping(true);

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: `${userInput}` },
            ]);
            setIsBotTyping(false);
        }, 5000);
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
                <div ref={messagesEndRef} /> {/* Élément invisible pour le scroll automatique */}
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
                <button className="send-button" onClick={handleSendMessage} disabled={isBotTyping}>
                    <img className="img-send" src={Envoyer} alt="Envoyer" />
                </button>
            </div>
        </div>
    );
}
