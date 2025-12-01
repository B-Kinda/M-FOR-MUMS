<div align="center">
  <h1>M FOR MUMS</h1>
  <h3>Plateforme de Coaching Sportif pour Mamans</h3>
  
  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
  [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

  ![M FOR MUMS Banner](https://via.placeholder.com/1200x400/FF6B6B/FFFFFF?text=M+FOR+MUMS+Coaching+Sportif)
</div>

## 📋 Table des Matières
- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies Utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Démarrage](#-démarrage)
- [Structure du Projet](#-structure-du-projet)
- [Contribuer](#-contribuer)
- [Licence](#-licence)
- [Contact](#-contact)

## 🎯 Présentation
M FOR MUMS est une plateforme innovante de coaching sportif spécialement conçue pour les mamans. Notre objectif est de fournir un accès facile à des services de coaching personnalisé, adaptés aux besoins spécifiques des mères de tous âges et de tous niveaux de condition physique.

## ✨ Fonctionnalités
- **Inscription et Authentification**
  - Création de compte
  - Connexion sécurisée
  - Authentification Google One Tap

- **Profil Utilisateur**
  - Gestion du profil personnel
  - Suivi des objectifs
  - Historique des séances

- **Catalogue de Services**
  - Parcours des coachs certifiés
  - Filtrage par spécialité
  - Système d'évaluation

- **Réservation**
  - Prise de rendez-vous en ligne
  - Gestion du calendrier
  - Rappels automatiques

## 🛠️ Technologies Utilisées
- **Backend**
  - Node.js
  - Express
  - PostgreSQL
  - JWT (JSON Web Tokens)
  - Google OAuth 2.0

- **Frontend**
  - EJS (Embedded JavaScript)
  - Bootstrap 5.3
  - Tailwind CSS
  - JavaScript Vanilla

- **Outils**
  - Git
  - NPM
  - dotenv
  - Helmet

## 🚀 Installation
1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/B-Kinda/M-FOR-MUMS.git
   cd M-FOR-MUMS/Projet
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   - Créer une base de données PostgreSQL
   - Exécuter le script SQL fourni dans `/app/db/schema.sql`

## ⚙️ Configuration
1. Copier le fichier `.env.example` vers `.env`
   ```bash
   cp .env.example .env
   ```

2. Modifier les variables d'environnement dans `.env`
   ```env
   # Configuration du serveur
   PORT=3000
   NODE_ENV=development
   
   # Base de données
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mformums
   DB_USER=postgres
   DB_PASSWORD=votre_mot_de_passe
   
   # Sécurité
   JWT_SECRET=votre_secret_jwt
   COOKIE_SECRET=votre_secret_cookie
   
   # Google OAuth
   GOOGLE_CLIENT_ID=votre_client_id
   GOOGLE_CLIENT_SECRET=votre_client_secret
   ```

## 🏃‍♂️ Démarrage

### Mode Développement
```bash
npm run dev
```

### Mode Production
```bash
npm start
```

Le serveur sera accessible à l'adresse : http://localhost:3000

## 📂 Structure du Projet
```
Projet/
├── app/
│   ├── controllers/    # Contrôleurs de l'application
│   ├── datamappers/    # Interaction avec la base de données
│   ├── middleware/     # Middleware personnalisés
│   ├── public/         # Fichiers statiques (CSS, JS, images)
│   ├── routes/         # Définition des routes
│   ├── services/       # Logique métier
│   ├── utils/          # Utilitaires
│   └── views/          # Templates EJS
├── .env.example        # Exemple de configuration
├── .gitignore
├── index.js            # Point d'entrée de l'application
└── package.json
```

## 🤝 Contribuer
Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence
Distribué sous licence ISC. Voir `LICENSE` pour plus d'informations.

## 📧 Contact
Pour toute question ou suggestion, n'hésitez pas à nous contacter :
- Email : contact@mformums.com
- Site Web : https://mformums.com

---

<div align="center">
  <p>✨ Fait avec ❤️ pour les mamans actives ✨</p>
</div>
