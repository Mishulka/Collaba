# Makefile for managing Docker Compose
COMPOSE_FILE = docker-compose.dev.yml

# Development
up:
	docker compose -f $(COMPOSE_FILE) up --build

down:
	docker compose -f $(COMPOSE_FILE) down

logs:
	docker compose -f $(COMPOSE_FILE) logs -f

restart:
	docker compose -f $(COMPOSE_FILE) restart

backend:
	docker compose -f $(COMPOSE_FILE) up --build server db

frontend:
	docker compose -f $(COMPOSE_FILE) up --build client

# Database
db-shell:
	docker compose -f $(COMPOSE_FILE) exec db psql -U postgres

db-migrate:
	docker compose -f $(COMPOSE_FILE) exec server python manage.py migrate

# Clean
clean:
	docker compose -f $(COMPOSE_FILE) down -v

help:
	@echo "Available commands:"
	@echo "  make up           - Запуск проекта"
	@echo "  make down         - Остановка"
	@echo "  make logs         - Логи"
	@echo "  make db-shell     - PostgreSQL консоль"
	@echo "  make db-migrate   - Миграции"
	@echo "  make backend      - Запуск backend в dev режиме"
	@echo "  make frontend      - Запуск frontend в dev режиме"
