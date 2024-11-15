import React from "react";
// @ts-ignore
import "../../../css/main-interface/header.css";
import { UserHeader } from "./UserHeader";
import ragadminLogo from "../../../res/ragadmin-logo.png";
import laposteLogo from "../../../res/laposte-logo.png";

export default function Header() {
    return (
        <div>
            <header className="header">
                <img src={laposteLogo} alt="la-poste-logo" className="logo-la-poste"/>
                <img src={ragadminLogo} alt="ragadmin-logo" className="logo-RAGAdmin" />
                <UserHeader />
            </header>
        </div>
    );
}
