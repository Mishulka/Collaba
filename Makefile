# Makefile for managing Docker Compose
COMPOSE = docker-compose.yml

# Development
up:
	docker compose -f $(COMPOSE) up --build

down:
	docker compose -f $(COMPOSE) down

logs:
	docker compose -f $(COMPOSE) logs -f

restart:
	docker compose -f $(COMPOSE) restart

backend:
	docker compose -f $(COMPOSE) up --build server db

frontend:
	docker compose -f $(COMPOSE) up --build client

# Database
db-shell:
	docker compose -f $(COMPOSE) exec db psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

db-migrate:
	docker compose -f $(COMPOSE) exec server python manage.py migrate

# Clean
clean:
	docker compose -f $(COMPOSE) down -v

help:
	@echo "Available commands:"
	@echo "  make up           - Запуск проекта"
	@echo "  make down         - Остановка"
	@echo "  make logs         - Логи"
	@echo "  make db-shell     - PostgreSQL консоль"
	@echo "  make db-migrate   - Миграции"
	@echo "  make backend      - Запуск backend в dev режиме"
	@echo "  make frontend      - Запуск frontend в dev режиме"
