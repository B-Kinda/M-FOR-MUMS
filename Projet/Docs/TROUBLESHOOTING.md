# Guide de Dépannage

Ce document répertorie les problèmes courants et leurs solutions.

## Problèmes d'Installation

### Erreur : Module non trouvé
```
Error: Cannot find module 'module-name'
```
**Solution :**
```bash
# Installer les dépendances manquantes
npm install
```

### Échec de la connexion à la base de données
```
SequelizeConnectionError: password authentication failed for user "user"
```
**Solution :**
1. Vérifiez les identifiants dans `.env`
2. Assurez-vous que l'utilisateur et la base de données existent
3. Vérifiez les permissions de l'utilisateur

## Problèmes d'Exécution

### L'application ne se lance pas
**Vérifiez :**
1. Si le port est déjà utilisé :
   ```bash
   lsof -i :3000
   kill -9 [PID]
   ```
2. Si les variables d'environnement sont définies
3. Les logs d'erreur :
   ```bash
   npm start --verbose
   ```

### Erreurs de migration
```
SequelizeDatabaseError: relation "table" does not exist
```
**Solution :**
```bash
# Annuler toutes les migrations
npx sequelize-cli db:migrate:undo:all

# Réappliquer les migrations
npx sequelize-cli db:migrate
```

## Problèmes d'Authentification

### Connexion impossible
**Vérifiez :**
1. Si l'utilisateur existe dans la base de données
2. Si le mot de passe est correct
3. Les logs du serveur pour les erreurs potentielles

### Session perdue
**Solution :**
1. Effacez les cookies du site
2. Vérifiez la configuration de la session dans `app.js`
3. Assurez-vous que `SESSION_SECRET` est défini dans `.env`

## Problèmes de Performance

### Lenteur des requêtes
**Solution :**
1. Vérifiez les requêtes lentes dans les logs
2. Ajoutez des index pour les requêtes fréquentes
3. Utilisez le chargement paresseux pour les relations

### Fuites de mémoire
**Solution :**
1. Surveillez l'utilisation de la mémoire avec `node --inspect`
2. Vérifiez les fuites de mémoire avec `node-memwatch`
3. Optimisez les requêtes de base de données

## Problèmes de Déploiement

### L'application ne se charge pas
**Vérifiez :**
1. Si le processus Node.js est en cours d'exécution :
   ```bash
   pm2 list
   ```
2. Les logs Nginx :
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```
3. Les logs de l'application :
   ```bash
   pm2 logs
   ```

### Problèmes de certificat SSL
**Solution :**
1. Vérifiez la validité du certificat :
   ```bash
   sudo certbot certificates
   ```
2. Renouvelez le certificat si nécessaire :
   ```bash
   sudo certbot renew --dry-run
   ```

## Problèmes Courants

### Erreurs CORS
**Solution :**
1. Vérifiez la configuration CORS dans `app.js`
2. Assurez-vous que les en-têtes sont correctement définis

### Problèmes de téléversement de fichiers
**Vérifiez :**
1. Les permissions du répertoire de téléversement
2. La taille maximale des fichiers dans la configuration
3. Le type MIME des fichiers

### Erreurs de base de données
**Solutions courantes :**
1. Connexion perdue :
   ```bash
   # Redémarrez le service PostgreSQL
   sudo systemctl restart postgresql
   ```
2. Tables verrouillées :
   ```sql
   -- Voir les verrous actifs
   SELECT * FROM pg_locks;
   ```

## Obtenir de l'Aide

Si vous ne trouvez pas de solution ici :
1. Consultez les [issues GitHub](lien-vers-les-issues)
2. Vérifiez la documentation officielle des technologies utilisées
3. Ouvrez une nouvelle issue avec les détails du problème
