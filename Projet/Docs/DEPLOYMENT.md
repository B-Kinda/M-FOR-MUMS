# Guide de Déploiement

Ce document explique comment déployer M FOR MUMS en production.

## Prérequis

- Serveur Linux (Ubuntu 20.04 recommandé) / MacOs 15.6.1 ou ultérieure
- Node.js 16.x
- PostgreSQL 13+
- Nginx
- PM2 (gestion des processus Node.js)
- Certificat SSL (Let's Encrypt recommandé)

## 1. Configuration du serveur

### Mise à jour du système

```bash
sudo apt update && sudo apt upgrade -y
```

### Installation des dépendances

```bash
# Node.js et npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Nginx
sudo apt install -y nginx

# PM2 (global)
npm install -g pm2
```

## 2. Configuration de la base de données

### Créer l'utilisateur et la base de données

```bash
sudo -u postgres createuser -P mformums
sudo -u postgres createdb -O mformums mformums_prod
```

### Configurer l'accès à la base de données

Éditez `/etc/postgresql/13/main/pg_hba.conf` pour autoriser les connexions locales :

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     peer
host    mformums_prod   mformums        127.0.0.1/32            md5
```

Redémarrez PostgreSQL :

```bash
sudo systemctl restart postgresql
```

## 3. Déploiement de l'application

### Récupérer le code

```bash
# Créer le répertoire de l'application
sudo mkdir -p /var/www/mformums
sudo chown $USER:$USER /var/www/mformums

# Cloner le dépôt (utiliser votre méthode préférée)
git clone [URL_DU_DEPOT] /var/www/mformums
cd /var/www/mformums
```

### Installer les dépendances

```bash
npm install --production
```

### Configurer l'environnement

```bash
cp .env.example .env
nano .env
```

Exemple de configuration :

```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgres://mformums:motdepasse@localhost:5432/mformums_prod
SESSION_SECRET=votre_secret_tres_long_et_securise
```

### Construire les assets (si nécessaire)

```bash
npm run build
```

## 4. Configuration de PM2

Créer un fichier de configuration PM2 :

```bash
pm2 ecosystem init
```

Éditez le fichier `ecosystem.config.js` :

```javascript
module.exports = {
  apps: [{
    name: "mformums",
    script: "./app.js",
    instances: "max",
    env: {
      NODE_ENV: "production",
    },
    error_file: "logs/err.log",
    out_file: "logs/out.log",
    merge_logs: true,
    log_date_format: "YYYY-MM-DD HH:mm:ss"
  }]
};
```

Démarrer l'application :

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 5. Configuration de Nginx

Créez un fichier de configuration :

```bash
sudo nano /etc/nginx/sites-available/mformums
```

Avec le contenu :

```nginx
server {
    listen 80;
    server_name mformums.com www.mformums.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mformums.com www.mformums.com;

    ssl_certificate /etc/letsencrypt/live/mformums.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mformums.com/privkey.pem;

    # Paramètres SSL recommandés
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Logs
    access_log /var/log/nginx/mformums.access.log;
    error_log /var/log/nginx/mformums.error.log;

    # Proxy vers l'application Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Fichiers statiques
    location /static/ {
        root /var/www/mformums/public;
        expires 30d;
        access_log off;
    }
}
```

Activer le site :

```bash
sudo ln -s /etc/nginx/sites-available/mformums /etc/nginx/sites-enabled/
sudo nginx -t  # Vérifier la configuration
sudo systemctl restart nginx
```

## 6. Configuration du pare-feu

```bash
# Installer UFW si ce n'est pas déjà fait
sudo apt install ufw

# Configurer les règles
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

## 7. Renouvellement automatique du certificat SSL

Si vous utilisez Let's Encrypt :

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir un certificat
sudo certbot --nginx -d mformums.com -d www.mformums.com

# Tester le renouvellement automatique
sudo certbot renew --dry-run
```

## 8. Surveillance et maintenance

### Vérifier les logs

```bash
# Logs de l'application
pm2 logs

# Logs Nginx
sudo tail -f /var/log/nginx/mformums.error.log
```

### Mise à jour de l'application

```bash
cd /var/www/mformums
git pull origin main
npm install
npm run build
pm2 restart mformums
```

## 9. Sauvegarde

### Script de sauvegarde

Créez un script `/usr/local/bin/backup-mformums.sh` :

```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/mformums"
DB_NAME="mformums_prod"

# Créer le répertoire de sauvegarde
mkdir -p $BACKUP_DIR

# Sauvegarder la base de données
PGPASSWORD=yourpassword pg_dump -U mformums -h localhost $DB_NAME > $BACKUP_DIR/$DB_NAME-$DATE.sql

# Sauvegarder les fichiers importants
tar -czf $BACKUP_DIR/mformums-files-$DATE.tar.gz /var/www/mformums/uploads

# Supprimer les sauvegardes de plus de 30 jours
find $BACKUP_DIR -type f -mtime +30 -delete
```

Rendez-le exécutable :

```bash
chmod +x /usr/local/bin/backup-mformums.sh
```

### Planifier la sauvegarde quotidienne

```bash
sudo crontab -e
```

Ajoutez la ligne suivante pour une sauvegarde quotidienne à 2h du matin :

```
0 2 * * * /usr/local/bin/backup-mformums.sh
```

## 10. Surveillance

### Installer un outil de surveillance

```bash
# Installer un outil de surveillance système
sudo apt install -y htop iotop iftop

# Installer un dashboard PM2
npm install -g pm2
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Vérifier l'état du système

```bash
# Voir les processus en cours
top

# Voir l'utilisation du disque
df -h

# Voir la mémoire utilisée
free -h
```

## Dépannage

### L'application ne démarre pas

```bash
# Voir les logs
pm2 logs mformums --lines 100

# Vérifier si le port est utilisé
sudo lsof -i :3000

# Redémarrer PM2
pm2 restart mformums
```

### Problèmes de base de données

```bash
# Se connecter à PostgreSQL
psql -U mformums -d mformums_prod

# Voir les connexions actives
SELECT * FROM pg_stat_activity;
```

### Problèmes Nginx

```bash
# Tester la configuration
sudo nginx -t

# Recharger la configuration
sudo systemctl reload nginx

# Voir les erreurs
sudo tail -f /var/log/nginx/error.log
```
