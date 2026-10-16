# Gestion des Employés

## Présentation du projet

Gestion des Employés est une application web permettant de gérer les informations des employés d'une entreprise. Elle facilite l'enregistrement, la consultation et l'organisation des données des employés.

## Technologies utilisées

- **Backend :** Python et Django
- **Frontend :** React.js et Vite
- **Base de données :** MySQL / MariaDB
- **Outils :** Visual Studio Code, Git et GitHub

## Fonctionnalités principales

- Gestion des employés
- Gestion des départements
- Gestion des postes
- Enregistrement et consultation des informations des employés
- Association des employés à un département et à un poste

## Structure du projet

```text
gestion_employes/
├── backend/
├── frontend/
├── .gitignore
└── README.md
```

## Installation et lancement

### 1. Cloner le projet

```bash
git clone https://github.com/rakotoarivonybakoky-cmyk/gestion_employes.git
cd gestion_employes
```

### 2. Lancer le backend Django

Ouvrir un terminal dans le dossier `backend`, activer l'environnement virtuel et installer les dépendances :

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Le backend sera accessible à l'adresse :

http://127.0.0.1:8000/

### 3. Lancer le frontend React

Ouvrir un deuxième terminal :

```bash
cd frontend
npm install
npm run dev
```

Le frontend sera accessible à l'adresse indiquée dans le terminal Vite, généralement :

http://localhost:5173/

## Auteur

Projet réalisé dans le cadre des études en Informatique de Gestion.

## Licence

Projet académique.