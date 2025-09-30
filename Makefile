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

client-lint:
	docker compose -f $(COMPOSE) exec client npm run lint

client-format:
	docker compose -f $(COMPOSE) exec client npx prettier --write .

client-format-check:
	docker compose -f $(COMPOSE) exec client npx prettier --check .

client-type-check:
	docker compose -f $(COMPOSE) exec client npx tsc --noEmit

client-validate:
	docker compose -f $(COMPOSE) exec client npm run lint && \
	docker compose -f $(COMPOSE) exec client npx tsc --noEmit && \
	docker compose -f $(COMPOSE) exec client npx prettier --check .

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
