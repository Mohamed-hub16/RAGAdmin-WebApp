import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/register-interface/register-block.css';

const RegisterBlock: React.FC = () => {
    const navigate = useNavigate();

    const handleRegisterCompleted = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/RAGAdmin')
    }

    return(
        <div className="register-div">
            <div className="yellow-block"/>
            <div className="margin-div">
                <span className="h2-register">Inscrivez-Vous</span>
                <form className="form-register">
                    <textarea spellCheck="false" className="register-id-area" placeholder="Identifiant"></textarea>
                    <textarea  spellCheck="false" className="register-password-area" placeholder="Mot de passe"></textarea>
                    <textarea  spellCheck="false" className="register-password-confirmation-area" placeholder="Confirmation mot de passe"></textarea>
                </form>
                <button className="button-register-completed" onClick={handleRegisterCompleted}>S'inscrire</button>
            </div>
        </div>

    );
};

export default RegisterBlock;