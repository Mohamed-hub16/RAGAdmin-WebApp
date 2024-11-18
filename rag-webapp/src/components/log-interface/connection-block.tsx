import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/log-interface/connection.css';

const ConnectionBlock: React.FC = () => {
    const navigate = useNavigate();

    const handleConnection = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/RAGAdmin');
    };

    return(
        <div className="connection-div">
            <div className="yellow-block"/>
            <div className="margin-div">
                <span className="h2-connection">Connectez-Vous</span>
                <form className="form-connection">
                    <textarea spellCheck="false" className="login-area" placeholder="Identifiant"></textarea>
                    <textarea  spellCheck="false" className="password-area" placeholder="Mot de passe"></textarea>
                    <div className="checkbox-container">
                        <input type="checkbox" id="connected" name="checkbox-connection" />
                        <label htmlFor="connected">Rester connecter</label>
                    </div>
                    <button className="button-connection" onClick={handleConnection}>Se Connecter</button>
                </form>
                <button className="button-register">S'inscrire</button>
            </div>
        </div>

    );
};

export default ConnectionBlock;