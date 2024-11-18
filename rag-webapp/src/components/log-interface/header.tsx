import React from 'react';
import ragadminLogo from "../../res/ragadmin-final.png"
import laPosteLogo from "../../res/laposte-logo.png"
import '../../css/log-interface/header.css';

const Header: React.FC = () => {
    return(
        <header className="header">
            <img src={laPosteLogo} alt="La Poste" className="logo-la-poste"/>
            <img src={ragadminLogo} alt="RAGAdmin" className="logo-RAGAdmin"/>
        </header>

    );
};

export default Header;