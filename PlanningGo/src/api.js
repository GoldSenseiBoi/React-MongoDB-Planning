const API_BASE_URL = "http://127.0.0.1:8000";

// Récupérer les tâches pour une année donnée
export const getTasksByYear = async (year) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks?year=${year}`);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des tâches");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur dans getTasksByYear:", error);
        return [];
    }
};

// Mettre à jour une tâche
export const updateTask = async (week, person) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ week, person }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de la tâche");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur dans updateTask:", error);
    }
};
