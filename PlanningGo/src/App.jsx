import { useCallback, useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]); // Stocker les tâches
  const [year, setYear] = useState(2025); // Année par défaut
  const [loading, setLoading] = useState(true);

  // Récupérer les tâches depuis l'API
  
  // Stabiliser fetchTasks avec useCallback
  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks?year=${year}`);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Mettre à jour une tâche
  const updateTask = async (week, person) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ week, person }),
      });

      if (response.ok) {
        fetchTasks(); // Recharger les tâches après la mise à jour
      } else {
        console.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="App">
      <h1>Planning des Corvées</h1>
      <label htmlFor="year">Année :</label>
      <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
        {Array.from({ length: 6 }, (_, i) => 2020 + i).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Semaine</th>
            <th>Personne</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.week}</td>
              <td>
                <select
                  value={task.person}
                  onChange={(e) => updateTask(task.week, e.target.value)}
                >
                  <option value="david">david</option>
                  <option value="vincent">vincent</option>
                  <option value="christophe">christophe</option>
                  <option value="thomas">thomas</option>
                  <option value="personne">personne</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => updateTask(task.week, task.person)}
                >
                  Valider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
