import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Gestion de la soumission du formulaire d'inscription
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null); // Réinitialiser les erreurs avant chaque tentative

        try {
            const response = await registerUser(username, password);
            console.log("Réponse serveur :", response);

            if (response && response.message === "Inscription réussie") {
                alert("Inscription réussie !");
                setError("Inscription réussie !");

                navigate('/login');
            } else if (response && response.error) {
                setError("Erreur : " + response.error);
            } else {
                setError("Erreur lors de l'inscription : Réponse inattendue");
            }
            
            
        } catch (err) {
            setError("Erreur lors de l'inscription : " + err.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Inscription</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Nom d'utilisateur" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">S inscrire</button>
            </form>
            <p>Déjà inscrit ? <a href="/login">Connectez-vous ici</a></p>
        </div>
    );
};

export default Register;
