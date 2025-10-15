# Structure du Projet M FOR MUMS

Ce document décrit l'organisation des dossiers et fichiers du projet.

## Arborescence Principale

```
Projet/
├── app/                    # Dossier principal de l'application
│   ├── auth/               # Gestion de l'authentification
│   ├── controllers/        # Contrôleurs de l'application
│   ├── data/               # Données et modèles
│   ├── datamappers/        # Couche d'accès aux données
│   ├── db/                 # Configuration et scripts de la base de données
│   ├── public/             # Fichiers statiques (CSS, JS, images)
│   ├── routes/             # Définition des routes de l'application
│   └── views/              # Templates EJS
│       └── partials/       # Partiels réutilisables
├── docs/                   # Documentation du projet
└── node_modules/           # Dépendances du projet (généré par npm)
```

## Description des Dossiers Principaux

### app/
Contient tout le code source de l'application.

- **auth/**: Gestion de l'authentification des utilisateurs
- **controllers/**: Logique métier et contrôleurs
- **data/**: Modèles de données et schémas
- **datamappers/**: Couche d'accès aux données
- **db/**: Configuration et scripts SQL
- **public/**:
  - `css/` - Feuilles de style
  - `js/` - Scripts côté client
  - `images/` - Images et médias
- **routes/**: Définition des routes de l'API et des pages
- **views/**: Templates EJS
  - `partials/` - Composants réutilisables (header, footer, etc.)
  - `pages/` - Pages complètes de l'application

### docs/
Documentation du projet, guides et ressources.

## Fichiers de Configuration

- `package.json` - Dépendances et scripts npm
- `.env` - Variables d'environnement (à créer)
- `.gitignore` - Fichiers à ignorer par Git

## Installation et Démarrage

1. Cloner le dépôt
2. `npm install` pour installer les dépendances
3. Configurer la base de données (voir `app/db/`)
4. `npm start` pour lancer l'application

## Conventions de Code

- JavaScript: ES6+ avec des fonctions asynchrones (async/await)
- Templates: EJS pour le rendu côté serveur
- Styles: CSS moderne avec préfixes automatiques
- Base de données: PostgreSQL avec requêtes paramétrées

## Déploiement

Les instructions de déploiement seront ajoutées ici.
