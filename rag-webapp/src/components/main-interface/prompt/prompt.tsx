import React from "react";
import "../../../css/main-interface/prompt.css";

export function Prompt() {
    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="message user-message">
                    Quel temps fait-il ? 1
                </div>
                <div className="message bot-message">
                    Il fait froid aujourd’hui.
                </div>
                <div className="message user-message">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec diam id ex tincidunt condimentum. Mauris quis urna urna. Integer imperdiet egestas mauris ut maximus. Pellentesque imperdiet nibh ex, quis tincidunt dui mattis ultricies. Donec vel eros a velit egestas maximus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam a interdum lorem.
                </div>
                <div className="message bot-message">
                    Il fait froid aujourd’hui.
                </div>
                <div className="message user-message">
                    Quel temps fait-il ? 3
                </div>
                <div className="message bot-message">
                    Il fait froid aujourd’hui.
                </div>
                <div className="message user-message">
                    Quel temps fait-il ? 4
                </div>
                <div className="message bot-message">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec diam id ex tincidunt condimentum. Mauris quis urna urna. Integer imperdiet egestas mauris ut maximus. Pellentesque imperdiet nibh ex, quis tincidunt dui mattis ultricies. Donec vel eros a velit egestas maximus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam a interdum lorem.
                </div>
                <div className="message user-message">
                    Quel temps fait-il ? 5
                </div>
                <div className="message bot-message">
                    Il fait froid aujourd’hui.
                </div>
                <div className="message user-message">
                    Quel temps fait-il ? 6
                </div>
                <div className="message bot-message">
                    Il fait froid aujourd’hui.
                </div>
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Entrez votre texte ici..."
                    className="input-field"
                />
                <button className="send-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
