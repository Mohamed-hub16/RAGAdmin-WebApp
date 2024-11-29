import React from 'react';
import ragadminLogo from "../../res/ragadmin-final.png"
import kamouloxlogo from "../../res/logo-kamoulox.png"
import '../../css/log-interface/header.css';

const Header: React.FC = () => {
    return(
        <header className="header">
            <img src={kamouloxlogo} alt="Kamoulox" className="logo-Kamoulox"/>
            <img src={ragadminLogo} alt="RAGAdmin" className="logo-RAGAdmin"/>
        </header>

    );
};

export default Header;