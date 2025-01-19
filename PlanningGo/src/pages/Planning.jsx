import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasks, updateTasks } from "../api";

const Planning = () => {
    const [tasks, setTasks] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [statistics, setStatistics] = useState({});
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer le nom de l'utilisateur depuis le localStorage
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
            navigate("/login"); // Redirige si pas connecté
        } else {
            setUsername(storedUsername);
        }

        // Charger les tâches
        const loadTasks = async () => {
            const data = await fetchTasks(year);
            if (data) {
                setTasks(data.weeks);
                setStatistics(data.statistics);
            }
        };
        loadTasks();
    }, [year, navigate]);

    // Fonction pour gérer les changements dans les tâches
    const handleTaskChange = (week, person) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.week === week ? { ...task, person } : task
            )
        );
    };

    // Fonction pour sauvegarder les modifications
    const handleSave = async () => {
        const response = await updateTasks(year, tasks);
        if (response && response.message) {
            alert("Planning mis à jour avec succès !");
        } else {
            alert("Une erreur est survenue lors de la mise à jour.");
        }
    };

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("username");
        navigate("/login"); // Redirige vers la page de connexion
    };

    return (
        <div className="planning-container">
            <h1>Bienvenue, {username} 👋</h1>
            <h2>Planning des corvées dépluchage🔪</h2>

            <button 
                onClick={handleLogout} 
                style={{ 
                    padding: "10px 20px", 
                    backgroundColor: "red", 
                    color: "white", 
                    border: "none", 
                    cursor: "pointer", 
                    marginBottom: "20px"
                }}
            >
                Déconnexion
            </button>

            <div>
                <label htmlFor="year">Année : </label>
                <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                >
                    {[...Array(6).keys()].map((offset) => {
                        const y = new Date().getFullYear() - offset;
                        return (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div 
                className="table-container" 
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    gap: '10px',
                    marginTop: '20px',
                }}
            >
                {tasks.map((task) => (
                    <div key={task.week} className={`week-item ${task.person}`}>
                        <span>{task.week}</span>
                        <select
                            value={task.person}
                            onChange={(e) => handleTaskChange(task.week, e.target.value)}
                        >
                            <option value="personne">personne</option>
                            <option value="vincent">vincent</option>
                            <option value="thomas">thomas</option>
                            <option value="david">david</option>
                            <option value="christophe">christophe</option>
                        </select>
                    </div>
                ))}
            </div>

            <button onClick={handleSave}>Valider le planning</button>

            <h2>Statistiques par ordre croissant</h2>
            {Object.keys(statistics).length > 0 ? (
                <ul>
                    {Object.entries(statistics)
                        .sort((a, b) => a[1] - b[1])
                        .map(([person, count]) => (
                            <li key={person}>
                                {person} : {count}
                            </li>
                        ))}
                </ul>
            ) : (
                <p>Aucune statistique disponible.</p>
            )}
        </div>
    );
};

export default Planning;
