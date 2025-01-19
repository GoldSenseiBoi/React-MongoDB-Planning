import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // URL de l'API backend

// Récupérer les tâches pour une année donnée
export const fetchTasks = async (year) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    return null;
  }
};

axios.defaults.withCredentials = false;

// Mettre à jour les tâches pour une année donnée
export const updateTasks = async (year, tasks) => {
    try {
      const response = await axios.post(
        `${API_URL}/tasks`,
        { year, tasks },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour des tâches :", error);
      return null;
    }
  };

// Inscription d'un utilisateur
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return null;
  }
};

// Connexion d'un utilisateur
export const loginUser = async (username, password) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { username, password },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return null;
  }
};
