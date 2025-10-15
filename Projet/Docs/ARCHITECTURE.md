# Architecture Technique

## Vue d'ensemble

L'application M FOR MUMS suit une architecture MVC (Modèle-Vue-Contrôleur) avec une séparation claire des responsabilités.

```
app/
├── controllers/    # Logique métier
├── models/         # Modèles de données
├── views/          # Templates EJS
├── routes/         # Définition des routes
├── middleware/     # Middleware Express
└── services/       # Logique métier complexe
```

## Technologies Utilisées

- **Backend**: Node.js avec Express
- **Base de données**: PostgreSQL avec Sequelize ORM
- **Templates**: EJS
- **CSS**: TailwindCSS
- **Authentification**: JWT + sessions
- **Tests**: Jest + Supertest

## Structure des Dossiers

- **/app/controllers**
  - Gestion des requêtes HTTP
  - Validation des entrées
  - Appel aux services

- **/app/models**
  - Définition des modèles de données
  - Relations entre modèles
  - Validations

- **/app/views**
  - Templates EJS
  - Partiels réutilisables
  - Mise en page

- **/app/routes**
  - Définition des routes API et web
  - Middleware d'authentification
  - Gestion des erreurs

- **/app/middleware**
  - Authentification
  - Validation
  - Logging
  - Gestion des erreurs

- **/app/services**
  - Logique métier complexe
  - Intégrations externes
  - Utilitaires

## Flux de Données

1. Le client effectue une requête HTTP
2. Le routeur dirige vers le contrôleur approprié
3. Le contrôleur valide les entrées et fait appel aux services
4. Les services effectuent les opérations métier et interagissent avec la base de données
5. Le contrôleur renvoie une réponse au client

## Sécurité

- Validation des entrées côté serveur
- Protection contre les attaques CSRF
- Gestion sécurisée des sessions
- Protection contre les injections SQL
- Headers de sécurité HTTP

## Performance

- Mise en cache des requêtes fréquentes
- Compression des réponses
- Chargement paresseux des ressources
- Optimisation des images

## Évolutivité

- Architecture modulaire
- Séparation claire des responsabilités
- Configuration par environnement
- Tests automatisés
