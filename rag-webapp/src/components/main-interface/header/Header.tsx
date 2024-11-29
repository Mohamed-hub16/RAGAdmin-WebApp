import React from "react";
// @ts-ignore
import "../../../css/main-interface/header.css";
import { UserHeader } from "./UserHeader";
import ragadminLogo from "../../../res/ragadmin-logo.png";
import kamouloxlogo from "../../../res/logo-kamoulox.png"

export default function Header() {
    return (
        <div>
            <header className="header">
                <img src={kamouloxlogo} alt="kamoulox-logo" className="logo-Kamoulox"/>
                <img src={ragadminLogo} alt="ragadmin-logo" className="logo-RAGAdmin" />
                <UserHeader />
            </header>
        </div>
    );
}
