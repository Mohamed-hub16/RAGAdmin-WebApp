import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import Envoyer from "../../../res/envoyer.png";
import "../../../css/main-interface/prompt.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Message {
    sender: "user" | "bot";
    text: string;
}
interface MessagesListProps {
    messages: Message[];
}


export function Prompt({
                           initialMessages,
                           historicalId,
                       }: {
    initialMessages: Message[];
    historicalId: number | null;
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (historicalId) {
            setMessages(initialMessages || []);
        } else {
            setMessages([]); // Réinitialise les messages quand aucun chat n'est ouvert
        }
    }, [initialMessages, historicalId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        if (!userInput.trim() || isBotTyping || !historicalId) return;

        const userMessage = { sender: "user", text: userInput };
        // @ts-ignore
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        await saveMessageToDatabase("user", userInput);

        setUserInput("");
        setIsBotTyping(true);

        setTimeout(async () => {
            const botResponse = userInput;
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: botResponse },
            ]);
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
            {!historicalId ? (
                <div className="no-chat-message">
                    <h2>Aucun chat d'ouvert !</h2>
                    <span>Ouvrez un nouveau chat ou créez en-un. </span>
                </div>
            ) : (
                <>
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    message.sender === "user" ? "user-message" : "bot-message"
                                }`}
                            >
                                {message.sender === "bot" ? (
                                    <ReactMarkdown
                                        components={{
                                            code({ node, inline, className, children, ...props }: any) {
                                                const match = /language-(\w+)/.exec(className || "");
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, "")}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }
                                            ,
                                        }}
                                    >
                                        {message.text}
                                    </ReactMarkdown>
                                ) : (
                                    <span>{message.text}</span>
                                )}
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
                            disabled={!historicalId}
                        />
                        <button
                            className="send-button"
                            onClick={handleSendMessage}
                            disabled={isBotTyping || !historicalId}
                        >
                            <img className="img-send" src={Envoyer} alt="Envoyer" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
