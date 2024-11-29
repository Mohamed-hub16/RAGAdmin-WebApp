import React from "react";
// @ts-ignore
import "../../../css/main-interface/header.css";
import { useNavigate } from "react-router-dom";

export function UserHeader() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/Login");
    };

    if (!user) {
        return (
            <div className="user-info">
                <span className="user-span">Veuillez vous connecter</span>
            </div>
        );
    }

    return (
        <div className="user-info">
            <img className="avatar-img" src={"https://via.placeholder.com/30"} alt="user-avatar" />
            <div className="user-details">
                <span className="user-span">{user.identifiant}</span>
                <span className="deconnect-span" onClick={handleLogout}>Se déconnecter</span>
            </div>
        </div>
    );
}
