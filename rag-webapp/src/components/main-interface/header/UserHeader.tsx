import React, { useEffect, useState } from "react";
// @ts-ignore
import "../../../css/main-interface/header.css";
import profileicon from "../../../res/profile-icon.png";
import { useNavigate } from "react-router-dom";

export function UserHeader() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Erreur API : ${response.statusText}`);
                }

                const data = await response.json();
                setUsername(data.user.identifiant);
            } catch (err) {
                console.error("Erreur lors de la récupération des informations utilisateur :", err);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/Login");
    };

    return (
        <div className="user-info">
            <img className="avatar-img" src={profileicon} alt="user-avatar" />
            <div className="user-details">
                <span className="user-span">{username || "Chargement..."}</span>
                <span className="deconnect-span" onClick={handleLogout}>
                    Se déconnecter
                </span>
            </div>
        </div>
    );
}
