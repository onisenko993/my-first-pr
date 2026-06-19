#!/bin/bash
# Скрипт деплоя Nova Horizon на сервер Timeweb
# Запускать на сервере: bash deploy.sh

set -e

APP_DIR="/var/www/nova-horizon"
REPO_URL="https://github.com/onisenko993/nova-horizon-ai-travel.git"

echo "=== Nova Horizon Deploy ==="

# Клонировать или обновить репозиторий
if [ -d "$APP_DIR" ]; then
  echo "Обновляем репозиторий..."
  cd "$APP_DIR"
  git pull origin main
else
  echo "Клонируем репозиторий..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# Проверить .env
if [ ! -f .env ]; then
  cp .env.example .env
  echo ""
  echo "ВАЖНО: Заполните .env файл своими ключами API!"
  echo "  nano $APP_DIR/.env"
  echo ""
  exit 1
fi

# Запустить через docker compose
echo "Запускаем сервисы..."
docker compose -f infrastructure/docker-compose.yml up -d --build

echo ""
echo "=== Деплой завершён ==="
echo "Сайт: https://novahorizon.ru"
echo "API:  https://novahorizon.ru/api/v1/health"
