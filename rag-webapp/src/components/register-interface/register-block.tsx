import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/register-interface/register-block.css';
import { API_BACK_IP } from "../../global";

const RegisterBlock: React.FC = () => {
    const navigate = useNavigate();
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState<{ identifiant?: string; password?: string; confirmation?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterCompleted = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const validationErrors: { identifiant?: string; password?: string; confirmation?: string } = {};
        if (!identifiant) validationErrors.identifiant = 'Identifiant requis.';
        if (!password) validationErrors.password = 'Mot de passe requis.';
        if (password !== passwordConfirmation) validationErrors.confirmation = 'Les mots de passe ne correspondent pas.';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setIsLoading(true);

        try {
            const response = await fetch(`http://${API_BACK_IP}:5000/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifiant, password }),
            });

            const data = await response.json();

            if (response.status === 201) {
                navigate('/Login');
            } else {
                setErrors({ identifiant: data.message || 'Erreur lors de l’inscription.' });
            }
        } catch (error) {
            console.error('Erreur lors de l’inscription:', error);
            setErrors({ identifiant: 'Une erreur est survenue. Veuillez réessayer.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-div">
            <div className="yellow-block" />
            <div className="margin-div">
                <span className="h2-register">Inscrivez-Vous</span>
                <form className="form-register">
                    <div className="input-container">
                        <input
                            type="text"
                            spellCheck="false"
                            className="register-id-area"
                            placeholder="Identifiant"
                            value={identifiant}
                            onChange={(e) => setIdentifiant(e.target.value)}
                        />
                        {errors.identifiant && <p className="error-message">{errors.identifiant}</p>}
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            spellCheck="false"
                            className="register-password-area"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            spellCheck="false"
                            className="register-password-confirmation-area"
                            placeholder="Confirmation mot de passe"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        {errors.confirmation && <p className="error-message">{errors.confirmation}</p>}
                    </div>
                </form>
                <button
                    className="button-register-completed"
                    onClick={handleRegisterCompleted}
                    disabled={isLoading}
                >
                    {isLoading ? 'En cours...' : "S'inscrire"}
                </button>
            </div>
        </div>
    );
};

export default RegisterBlock;
