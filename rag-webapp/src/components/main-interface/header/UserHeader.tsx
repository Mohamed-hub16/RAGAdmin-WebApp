import React from "react";
// @ts-ignore
import styles from "../../../css/main-interface/header.css";

export function UserHeader() {
    return (
        <div className={styles.userInfo}>
            <img src={"https://via.placeholder.com/30"} alt="user-avatar" />
            <div>
                <span>Utilisateur</span>
                <span>Connecté</span>
            </div>
        </div>
    );
}
