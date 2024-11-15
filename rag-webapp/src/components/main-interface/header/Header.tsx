import React from "react";
// @ts-ignore
import styles from "../../../css/main-interface/header.css";
import { UserHeader } from "./UserHeader";
import ragadminLogo from "../../../res/ragadmin-logo.png";
import laposteLogo from "../../../res/laposte-logo.png";

export default function Header() {
    return (
        <div>
            <header className={styles.Header}>
                <img src={laposteLogo} alt="la-poste-logo" />
                <img src={ragadminLogo} alt="ragadmin-logo" />
                <UserHeader />
            </header>
        </div>
    );
}
