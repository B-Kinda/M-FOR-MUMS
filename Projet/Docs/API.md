# Documentation de l'API

Ce document décrit les endpoints de l'API REST de M FOR MUMS.

## Authentification

L'API utilise JWT pour l'authentification. Inclure le token dans le header :
```
Authorization: Bearer <token>
```

## Endpoints

### Authentification

#### Connexion
```
POST /api/auth/login
```

**Corps de la requête :**
```json
{
  "email": "utilisateur@example.com",
  "password": "motdepasse"
}
```

**Réponse réussie (200 OK) :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "utilisateur@example.com",
    "role": "user"
  }
}
```

### Utilisateurs

#### Créer un compte
```
POST /api/users/register
```

#### Récupérer le profil
```
GET /api/users/me
```

### Articles

#### Lister les articles
```
GET /api/articles
```

#### Créer un article (admin)
```
POST /api/articles
```

### Commentaires

#### Ajouter un commentaire
```
POST /api/articles/:articleId/comments
```

## Codes d'état HTTP

- 200 OK - Requête réussie
- 201 Created - Ressource créée
- 400 Bad Request - Données invalides
- 401 Unauthorized - Non authentifié
- 403 Forbidden - Accès refusé
- 404 Not Found - Ressource introuvable
- 500 Internal Server Error - Erreur serveur

## Pagination

Les endpoints de liste supportent la pagination :
```
GET /api/articles?page=1&limit=10
```

## Filtrage et Tri

```
GET /api/articles?category=grossesse&sort=date:desc
```

## Limites de débit

- 100 requêtes par minute par adresse IP
- 1000 requêtes par heure par utilisateur authentifié

## Versionnage

L'API est versionnée via l'URL :
```
/api/v1/...
```

## Exemple d'utilisation avec cURL

```bash
# S'authentifier
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Récupérer les articles
curl -X GET http://localhost:3000/api/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_JWT"
```
