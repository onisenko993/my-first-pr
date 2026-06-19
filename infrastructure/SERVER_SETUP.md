# Настройка сервера Timeweb

## Данные сервера

- **IP**: 216.57.110.191
- **SSH**: `ssh root@216.57.110.191`
- **Нода**: kvmnvm-985
- **Провайдер**: Timeweb Cloud

## Первоначальная настройка (выполнить через Putty)

### 1. Обновить систему

```bash
apt update && apt upgrade -y
```

### 2. Установить Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl enable docker
systemctl start docker
```

### 3. Установить Docker Compose

```bash
apt install docker-compose-plugin -y
docker compose version
```

### 4. Установить Nginx

```bash
apt install nginx -y
systemctl enable nginx
systemctl start nginx
```

### 5. Установить Certbot (SSL)

```bash
apt install certbot python3-certbot-nginx -y
```

### 6. Настроить firewall

```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

### 7. Настроить домен novahorizon.ru

В панели Timeweb → Домены → nova-horizon.ru → DNS-записи:
- A-запись: `@` → `216.57.110.191`
- A-запись: `www` → `216.57.110.191`

### 8. Получить SSL-сертификат

```bash
certbot --nginx -d novahorizon.ru -d www.novahorizon.ru
```

### 9. Клонировать репозиторий

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/onisenko993/nova-horizon-ai-travel.git
cd nova-horizon-ai-travel
cp .env.example .env
# Заполнить .env ключами
```

### 10. Запустить приложение

```bash
docker compose up -d
```

## Nginx конфиг

Файл: `/etc/nginx/sites-available/novahorizon.ru`

```nginx
server {
    listen 80;
    server_name novahorizon.ru www.novahorizon.ru;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name novahorizon.ru www.novahorizon.ru;

    ssl_certificate /etc/letsencrypt/live/novahorizon.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/novahorizon.ru/privkey.pem;

    # Frontend (Next.js на порту 3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API (FastAPI на порту 8000)
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/novahorizon.ru /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```
