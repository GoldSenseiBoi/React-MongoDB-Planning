import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Gestion de la soumission du formulaire de connexion
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await loginUser(username, password);
    
        if (response && response.message === "Connexion réussie") {
            localStorage.setItem('userToken', response.token);
            localStorage.setItem('username', response.username);  // Stocke le nom de l'utilisateur
            navigate('/planning');
        } else {
            setError("Nom d'utilisateur ou mot de passe incorrect");
        }
    };
    

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
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
                <button type="submit">Se connecter</button>
            </form>
            <p>Pas encore inscrit ? <a href="/register">Inscrivez-vous ici</a></p>
        </div>
    );
};

export default Login;
