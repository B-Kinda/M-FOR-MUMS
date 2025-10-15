# Guide d'Installation

Ce guide vous aidera à installer et configurer M FOR MUMS en environnement de développement local.

## Prérequis

- Node.js 16.x ou supérieur
- npm 8.x ou supérieur
- PostgreSQL 13+
- Git

## Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone [URL_DU_DEPOT]
   cd M-FOR-MUMS/Projet
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   ```bash
   cp .env.example .env
   ```
   Puis éditez le fichier `.env` avec vos paramètres.

4. **Configuration de la base de données**
   ```bash
   # Créer la base de données
   createdb mformums_dev
   
   # Exécuter les migrations
   npm run db:migrate
   
   # Peupler la base de données (optionnel)
   npm run db:seed
   ```

5. **Démarrer l'application**
   ```bash
   # Mode développement
   npm run dev
   
   # Ou en production
   npm start
   ```

6. **Accéder à l'application**
   Ouvrez votre navigateur à l'adresse : http://localhost:3000

## Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/mformums_dev
SESSION_SECRET=votre_secret_session
# Ajoutez ici d'autres variables nécessaires
```

## Dépannage

Si vous rencontrez des problèmes, consultez le fichier [TROUBLESHOOTING.md](TROUBLESHOOTING.md) pour des solutions aux problèmes courants.
