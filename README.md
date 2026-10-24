# Gestion des Employés

## Description

Gestion des Employés est une application web permettant de gérer les informations des employés d'une entreprise. Elle permet d'enregistrer, de consulter, de modifier et de supprimer les informations des employés, des départements et des postes.

## Technologies utilisées

- **Backend :** Python et Django
- **Frontend :** React.js et Vite
- **Base de données :** SQLite
- **Outils :** Visual Studio Code, Git et GitHub
- **Hébergement :** PythonAnywhere

## Fonctionnalités principales

- Gestion des employés
- Gestion des départements
- Gestion des postes
- Enregistrement, consultation, modification et suppression des données
- Association des employés à un département et à un poste
- Authentification de l'administrateur

## Structure du projet

```text
gestion_employes/
├── backend/
│   ├── backend/
│   ├── gestion/
│   ├── manage.py
│   ├── requirements.txt
│   └── db.sqlite3
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Installation en local

### 1. Cloner le projet

```bash
git clone https://github.com/rakotoarivonybakoky-cmyk/gestion_employes.git
cd gestion_employes
```

### 2. Lancer le backend Django

Ouvrir un terminal dans le dossier `backend` :

```bash
python -m venv .venv
```

Sous Windows, activer l'environnement virtuel :

```bat
.venv\Scripts\activate
```

Installer les dépendances et appliquer les migrations :

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Le backend local est accessible à l'adresse :

http://127.0.0.1:8000/

### 3. Lancer le frontend React

Ouvrir un deuxième terminal dans le dossier `frontend` :

```bash
npm install
npm run dev
```

Ouvrir l'adresse affichée par Vite, généralement :

http://localhost:5173/

## Application en ligne

https://maholy.pythonanywhere.com/app/

## Code source

https://github.com/rakotoarivonybakoky-cmyk/gestion_employes