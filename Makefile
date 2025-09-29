# Makefile for managing Docker Compose
COMPOSE = docker-compose.yml
SERVER_CONTAINER = server
DB_CONTAINER = db

# Development
up:
	docker compose -f $(COMPOSE) up --build

up-detached:
	docker compose -f $(COMPOSE) up --build -d

down:
	docker compose -f $(COMPOSE) down

down-clean:
	docker compose -f $(COMPOSE) down -v --remove-orphans

logs:
	docker compose -f $(COMPOSE) logs -f

logs-server:
	docker compose -f $(COMPOSE) logs -f $(SERVER_CONTAINER)

logs-db:
	docker compose -f $(COMPOSE) logs -f $(DB_CONTAINER)

restart:
	docker compose -f $(COMPOSE) restart

restart-server:
	docker compose -f $(COMPOSE) restart $(SERVER_CONTAINER)

backend:
	docker compose -f $(COMPOSE) up --build $(SERVER_CONTAINER) $(DB_CONTAINER)

frontend:
	docker compose -f $(COMPOSE) up --build client

# Database
db-shell:
	docker compose -f $(COMPOSE) exec $(DB_CONTAINER) psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

db-makemigrations:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py makemigrations

db-makemigrations-app:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py makemigrations $(app)

db-migrate:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py migrate

db-migrate-app:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py migrate $(app)

db-showmigrations:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py showmigrations

db-reset: down-clean up-detached
	sleep 5
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py migrate

# Django Management
shell:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py shell

createsuperuser:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py createsuperuser

collectstatic:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py collectstatic --noinput

test:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py test

test-app:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py test $(app)

# Frontend Management
client-bash:
	docker compose -f $(COMPOSE) exec client sh

client-logs:
	docker compose -f $(COMPOSE) logs -f client

client-install:
	docker compose -f $(COMPOSE) exec client npm install

client-audit:
	docker compose -f $(COMPOSE) exec client npm audit

client-audit-fix:
	docker compose -f $(COMPOSE) exec client npm audit fix

client-audit-fix-force:
	docker compose -f $(COMPOSE) exec client npm audit fix --force

client-update-browserslist:
	docker compose -f $(COMPOSE) exec client npx browserslist@latest --update-db

# Docker Management
ps:
	docker compose -f $(COMPOSE) ps

images:
	docker compose -f $(COMPOSE) images

volumes:
	docker compose -f $(COMPOSE) volume ls

stats:
	docker stats $$(docker compose -f $(COMPOSE) ps -q)

# Server Management
server-bash:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) bash

server-logs:
	docker compose -f $(COMPOSE) logs -f $(SERVER_CONTAINER)

# Dependencies
requirements:
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) pip freeze > requirements.txt

i-deps:
	docker compose -f $(COMPOSE) run --rm $(SERVER_CONTAINER) pip install -r requirements.txt

# Cleanup
clean-cache:
	docker system prune -f

clean-all: down-clean
	docker system prune -a -f

# Health Check
health:
	docker compose -f $(COMPOSE) ps
	@echo "--- Database Connection ---"
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python -c "import django; django.setup(); from django.db import connection; cursor = connection.cursor(); cursor.execute('SELECT 1'); print('✅ Database connected')"
	@echo "--- Django Check ---"
	docker compose -f $(COMPOSE) exec $(SERVER_CONTAINER) python manage.py check

# Help
# Help
help:
	@echo "🐳 Docker Compose Commands:"
	@echo "  make up                 - Запуск проекта"
	@echo "  make up-detached        - Запуск в фоне"
	@echo "  make down               - Остановка"
	@echo "  make down-clean         - Остановка с удалением volumes"
	@echo "  make logs               - Логи всех сервисов"
	@echo "  make restart            - Перезапуск всех сервисов"
	
	@echo ""
	@echo "🗄️ Database Commands:"
	@echo "  make db-shell           - PostgreSQL консоль"
	@echo "  make db-makemigrations  - Создать миграции"
	@echo "  make db-makemigrations app=<app> - Создать миграции для приложения"
	@echo "  make db-migrate         - Применить миграции"
	@echo "  make db-migrate-app app=<app> - Мигрировать конкретное приложение"
	@echo "  make db-showmigrations  - Показать статус миграций"
	@echo "  make db-reset           - Полный сброс БД"
	
	@echo ""
	@echo "🐍 Django Management:"
	@echo "  make shell              - Django shell"
	@echo "  make createsuperuser    - Создать суперпользователя"
	@echo "  make collectstatic      - Собрать статику"
	@echo "  make test               - Запустить тесты"
	@echo "  make test-app app=<app> - Тесты конкретного приложения"
	
	@echo ""
	@echo "⚛️ Frontend (Next.js) Management:"
	@echo "  make client-bash        - Shell в контейнере клиента"
	@echo "  make client-logs        - Логи клиента"
	@echo "  make client-install     - Установить зависимости (npm install)"
	@echo "  make client-audit       - Проверить уязвимости (npm audit)"
	@echo "  make client-audit-fix   - Починить уязвимости (безопасные)"
	@echo "  make client-audit-fix-force - Починить всё (даже ломающее)"
	@echo "  make client-update-browserslist - Обновить базу Browserslist"

	@echo ""
	@echo "🔧 Development Tools:"
	@echo "  make server-bash        - Bash в контейнере server"
	@echo "  make requirements       - Обновить requirements.txt"
	@echo "  make health             - Проверить здоровье системы"
	@echo "  make ps                 - Показать статус контейнеров"
	
	@echo ""
	@echo "🧹 Cleanup:"
	@echo "  make clean-cache        - Очистить кэш Docker"
	@echo "  make clean-all          - Полная очистка"
