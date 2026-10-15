const API_URL = "http://127.0.0.1:8000";


export async function testerBackend() {

  const response = await fetch(
    `${API_URL}/`
  );

  if (!response.ok) {

    throw new Error(
      "Erreur de connexion avec Django"
    );
  }

  return await response.json();
}


export async function getDepartements() {

  const response = await fetch(
    `${API_URL}/departements/`
  );

  if (!response.ok) {

    throw new Error(
      "Impossible de charger les départements"
    );
  }

  return await response.json();
}


export async function getPostes() {

  const response = await fetch(
    `${API_URL}/postes/`
  );

  if (!response.ok) {

    throw new Error(
      "Impossible de charger les postes"
    );
  }

  return await response.json();
}


export async function getEmployes() {

  const response = await fetch(
    `${API_URL}/employes/`
  );

  if (!response.ok) {

    throw new Error(
      "Impossible de charger les employés"
    );
  }

  return await response.json();
}