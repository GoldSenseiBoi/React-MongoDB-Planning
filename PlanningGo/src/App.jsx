import { useEffect, useState } from "react";
import { fetchTasks, updateTasks } from "./api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [statistics, setStatistics] = useState({});

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

  const handleTaskChange = (week, person) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.week === week ? { ...task, person } : task
      )
    );
  };

  const handleSave = async () => {
    const response = await updateTasks(year, tasks);
    if (response && response.message) {
      alert("Planning mis à jour avec succès !");
    } else {
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div className="planning-container">
      <h1>Planning des corvées dépluchage</h1>

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

      <div className="table-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '10px',
        marginTop: '20px',
      }}>
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
      <ul>
        {Object.entries(statistics)
          .sort((a, b) => a[1] - b[1])
          .map(([person, count]) => (
            <li key={person}>
              {person} : {count}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
