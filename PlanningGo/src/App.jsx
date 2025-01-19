import { useEffect, useState } from "react";
import { fetchTasks, updateTasks } from "./api";

const App = () => {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [year, setYear] = useState(new Date().getFullYear()); // Année sélectionnée
  const [statistics, setStatistics] = useState({}); // Statistiques des participants

  // Charger les tâches et statistiques lors du changement d'année
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks(year);
      if (data) {
        setTasks(data.weeks);
        setStatistics(data.statistics);
      }
    };
    loadTasks();
  }, [year]);

  // Gérer la mise à jour des tâches
  const handleTaskChange = (week, person) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.week === week ? { ...task, person } : task
      )
    );
  };

  // Enregistrer les modifications dans le backend
  const handleSave = async () => {
    const response = await updateTasks(year, tasks);
    if (response && response.message) {
      alert("Planning mis à jour avec succès !");
    } else {
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div>
      <h1>Planning des corvées dépluchage</h1>

      {/* Sélecteur d'année */}
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

      {/* Tableau des tâches */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Semaine</th>
            <th>Personne</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.week}>
              <td>{task.week}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bouton de validation */}
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Valider le planning
      </button>

      {/* Statistiques */}
      <h2>Statistiques des participants</h2>
      <ul>
        {Object.entries(statistics).map(([person, count]) => (
          <li key={person}>
            {person} : {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
