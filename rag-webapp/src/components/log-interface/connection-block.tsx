import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/log-interface/connection.css';

const ConnectionBlock: React.FC = () => {
    const navigate = useNavigate();

    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ identifiant?: string; password?: string }>({});

    const handleConnection = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const validationErrors: { identifiant?: string; password?: string } = {};
        if (!identifiant) validationErrors.identifiant = 'Identifiant requis.';
        if (!password) validationErrors.password = 'Mot de passe requis.';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            const response = await fetch('http://192.168.0.1:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifiant, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('userId', data.user.id);
                navigate('/RAGAdmin');
            } else {
                setErrors({ identifiant: data.message || 'Identifiant ou mot de passe incorrect.' });
            }

        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setErrors({ identifiant: 'Une erreur est survenue lors de la connexion.' });
        }
    };


    const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/Register');
    };

    return (
        <div className="connection-div">
            <div className="yellow-block" />
            <div className="margin-div">
                <span className="h2-connection">Connectez-Vous</span>
                <form className="form-connection">
                    <div className="input-container">
                        <input
                            type="text"
                            spellCheck="false"
                            className="login-area"
                            placeholder="Identifiant"
                            value={identifiant}
                            onChange={(e) => setIdentifiant(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            spellCheck="false"
                            className="password-area"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.identifiant && <p className="error-message">{errors.identifiant}</p>}
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <button className="button-connection" onClick={handleConnection}>
                        Se Connecter
                    </button>
                </form>
                <button className="button-register" onClick={handleRegister}>
                    S'inscrire
                </button>
            </div>
        </div>
    );
};

export default ConnectionBlock;
