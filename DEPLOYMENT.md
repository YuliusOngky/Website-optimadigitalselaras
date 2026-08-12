# Deployment Guide - GIOS x250 (192.168.1.20)

## Setup SSH Deployment

### 1. Setup GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
DEPLOY_HOST=192.168.1.20
DEPLOY_USER=your-username
DEPLOY_SSH_KEY=<your-private-ssh-key>
DEPLOY_SSH_PORT=22
DEPLOY_PATH=/var/www/optimadigitalselaras
```

### 2. Generate SSH Key Pair

On your local machine:

```bash
ssh-keygen -t ed25519 -C "github-actions" -f deploy_key -N ""
```

This creates:
- `deploy_key` - Private key (for GitHub secrets)
- `deploy_key.pub` - Public key (for server)

### 3. Setup on Server (GIOS x250)

SSH to your server:

```bash
ssh user@192.168.1.20
```

Add public key to authorized keys:

```bash
# Create .ssh directory if not exists
mkdir -p ~/.ssh

# Add public key
echo "your-deploy_key.pub-content" >> ~/.ssh/authorized_keys

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Create deployment directory
sudo mkdir -p /var/www/optimadigitalselaras
sudo chown $USER:$USER /var/www/optimadigitalselaras
```

### 4. Setup Web Server

#### Nginx Configuration

Create `/etc/nginx/sites-available/optimadigitalselaras`:

```nginx
server {
    listen 80;
    server_name optimadigitalselaras.com www.optimadigitalselaras.com;

    root /var/www/optimadigitalselaras;
    index index.html;

    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - serve index.html for all non-file routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/optimadigitalselaras /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Apache Configuration

Create `/etc/apache2/sites-available/optimadigitalselaras.conf`:

```apache
<VirtualHost *:80>
    ServerName optimadigitalselaras.com
    ServerAlias www.optimadigitalselaras.com

    DocumentRoot /var/www/optimadigitalselaras

    <Directory /var/www/optimadigitalselaras>
        Options -MultiViews
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^ index.html [QSA,L]
    </Directory>

    <FilesMatch "\.(js|css|woff2)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>

    # Security headers
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"

    ErrorLog ${APACHE_LOG_DIR}/optimadigitalselaras_error.log
    CustomLog ${APACHE_LOG_DIR}/optimadigitalselaras_access.log combined
</VirtualHost>
```

Enable the site:

```bash
sudo a2enmod rewrite
sudo a2ensite optimadigitalselaras
sudo apache2ctl configtest
sudo systemctl restart apache2
```

### 5. Manual Deployment (Local)

```bash
# Build project
npm run build

# Deploy using SSH
./scripts/deploy.sh

# Or manually:
scp -P 22 -r dist/* user@192.168.1.20:/var/www/optimadigitalselaras/
```

### 6. Automatic Deployment (GitHub Actions)

Push to `main` branch:

```bash
git add .
git commit -m "Deploy update"
git push origin main
```

GitHub Actions will automatically:
1. Build the project
2. Deploy to GIOS x250
3. Send notifications

## Monitoring & Logs

### Check deployment status

```bash
ssh user@192.168.1.20
cd /var/www/optimadigitalselaras
ls -la
```

### View logs

**Nginx:**
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

**Apache:**
```bash
tail -f /var/log/apache2/optimadigitalselaras_access.log
tail -f /var/log/apache2/optimadigitalselaras_error.log
```

## SSL/HTTPS Setup

### Using Let's Encrypt with Nginx

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d optimadigitalselaras.com -d www.optimadigitalselaras.com
```

### Using Let's Encrypt with Apache

```bash
sudo apt-get install certbot python3-certbot-apache
sudo certbot --apache -d optimadigitalselaras.com -d www.optimadigitalselaras.com
```

## Troubleshooting

### Deployment fails with SSH error
- Check SSH key setup
- Verify server IP and port
- Test SSH connection: `ssh -i deploy_key user@192.168.1.20`

### Web server returns 404
- Check deployment path exists
- Verify index.html in deployment directory
- Check web server configuration
- Restart web server: `sudo systemctl restart nginx` or `sudo systemctl restart apache2`

### Static files not loading
- Verify `/assets` directory exists
- Check file permissions: `chmod -R 755 /var/www/optimadigitalselaras`
- Check web server configuration for caching headers

## Performance Optimization

### Enable gzip compression

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/json application/javascript;
gzip_min_length 1000;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### Enable caching

Already configured in web server blocks above.

---

**Deployment ready!** 🚀

For questions or issues, check logs and verify configuration steps.
