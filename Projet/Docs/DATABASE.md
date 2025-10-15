# Base de Données

## Schéma de la Base de Données

### Utilisateurs (`users`)
- `id` - Identifiant unique (UUID)
- `email` - Email de l'utilisateur (unique)
- `password_hash` - Mot de passe hashé
- `first_name` - Prénom
- `last_name` - Nom
- `role` - Rôle (user, admin)
- `created_at` - Date de création
- `updated_at` - Date de mise à jour

### Articles (`articles`)
- `id` - Identifiant unique
- `title` - Titre de l'article
- `content` - Contenu de l'article
- `author_id` - Référence à l'utilisateur
- `category` - Catégorie (grossesse, accouchement, etc.)
- `published` - Booléen de publication
- `created_at` - Date de création
- `updated_at` - Date de mise à jour

### Commentaires (`comments`)
- `id` - Identifiant unique
- `content` - Contenu du commentaire
- `article_id` - Article associé
- `user_id` - Auteur du commentaire
- `created_at` - Date de création
- `updated_at` - Date de mise à jour

## Relations

- Un utilisateur peut écrire plusieurs articles (1-n)
- Un article appartient à un utilisateur (n-1)
- Un article peut avoir plusieurs commentaires (1-n)
- Un commentaire appartient à un utilisateur (n-1)

## Migrations

Les migrations sont gérées avec Sequelize. Pour créer une nouvelle migration :

```bash
npx sequelize-cli migration:generate --name nom-de-la-migration
```

## Exécuter les migrations

```bash
# Exécuter toutes les migrations en attente
npm run db:migrate

# Annuler la dernière migration
npm run db:migrate:undo

# Réinitialiser complètement la base de données
npm run db:migrate:undo:all
```

## Seeds

Des données de test peuvent être chargées avec :

```bash
npm run db:seed:all
```

## Sauvegarde et Restauration

### Sauvegarder la base de données
```bash
pg_dump -U username -d dbname > backup.sql
```

### Restaurer la base de données
```bash
psql -U username -d dbname < backup.sql
```

## Index

Les index suivants sont recommandés pour les performances :
- `users.email` (unique)
- `articles.author_id`
- `comments.article_id`
- `comments.user_id`

## Sécurité

- Les mots de passe sont hashés avec bcrypt
- Les requêtes utilisent des paramètres préparés
- Les rôles sont vérifiés au niveau du middleware

## Performance

- Les requêtes fréquentes sont optimisées
- Les jointures sont utilisées avec parcimonie
- Le chargement paresseux (lazy loading) est utilisé pour les relations

## Maintenance

### Vérifier l'état de la base de données
```sql
SELECT * FROM pg_stat_activity;
```

### Vérifier les performances des requêtes
```sql
SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;
```

### Nettoyer les connexions inactives
```sql
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = 'mformums_dev' 
  AND pid <> pg_backend_pid() 
  AND state = 'idle';
```
