# Django + Next.js Фулстек prod-ready проект  

## 📑 Оглавление
- [Объяснение процессов разработки](#объяснение-процессов-разработки)  
- [Установка Docker](#установка-docker)  
- [Установка WSL и Ubuntu (для Windows)](#установка-wsl-и-ubuntu-для-windows)  
- [Клонирование проекта](#клонирование-проекта)  
- [Установка dos2unix](#установка-dos2unix)  
- [Бэкенд](#бэкенд)  
- [Доступы](#доступы)  
- [Данные администратора](#данные-администратора)  
- [Полезные команды](#полезные-команды)  
- [Дополнительно](#дополнительно)  
- [Процесс разработки](#процесс-разработки)  

---

## Объяснение процессов разработки  
- **Docker** — это как коробка: в ней всё нужное (Python, Node.js, Postgres). Неважно, на какой ОС ты запускаешь — внутри контейнера всё одинаково.  
- **docker-compose** — сценарий, который запускает несколько контейнеров сразу (например, Django + React + база).  
- **.env** — файл с паролями и настройками, чтобы их не хранить прямо в коде.  
- **createsuperuser** — команда для создания админа в Django.  
- **Разработка через Docker** — удобно, чтобы у всех разработчиков проект запускался одинаково.  
- **Разработка локально** — быстрее для мелких правок, но нужны установленные Python и Node.js.  

---

## Установка Docker  
curl -fsSL https://get.docker.com -o get-docker.sh  
sudo sh get-docker.sh  

---

## Установка WSL и Ubuntu (для Windows)  
wsl --install  
wsl --set-default-version 2  
wsl --install -d Ubuntu  

---

## Клонирование проекта  
git clone https://github.com/akshat2602/django-nextjs-boilerplate.git  
cd django-nextjs-boilerplate  

---

## Установка dos2unix  
(важно для исправления переносов строк в файлах, созданных на Windows)  

sudo apt update && sudo apt install -y dos2unix  
dos2unix migrations.sh  

---

## Бэкенд  
Сборка контейнеров:  
docker-compose -f docker-compose.dev.yml build  

Запуск контейнеров:  
docker-compose -f docker-compose.dev.yml up  

Применение миграций базы данных:  
docker exec -it server python manage.py migrate  

---

## Доступы  
Backend (API): http://localhost:8000  
Swagger Docs: http://localhost:8000/swagger  
Frontend (Next.js): http://localhost:3000  
Django Admin: http://localhost:8000/admin  

---

## Данные администратора  
Username: admin  
Email: admin@admin.com  
Password: admin  

---

## Полезные команды  
- Проверить контейнеры: `docker ps`  
- Логи сервера: `docker logs server`  
- Пересобрать образы без кеша: `docker-compose -f docker-compose.dev.yml build --no-cache`  
- Остановить контейнеры: `docker-compose -f docker-compose.dev.yml down`  
- Очистить систему от мусора: `docker system prune -a`  
- Зайти внутрь контейнера Django: `docker exec -it server bash`  

---

## Дополнительно  
- Сборка контейнеров: `docker-compose build`  
- Запуск контейнеров: `docker-compose up -d`  
- Остановка: `docker-compose down`  

---

## Процесс разработки  
### Вариант 1 — через Docker (универсально)  
- Всё запускается через `docker-compose up`  
- Бэкенд и фронтенд работают в контейнерах  
- Можно разрабатывать на любой ОС одинаково  

### Вариант 2 — локально (удобно для быстрых правок)  

**Django:**  
pip install -r requirements.txt  
python manage.py migrate  
python manage.py runserver  
→ проект поднимется на http://127.0.0.1:8000  

**React:**  
cd frontend  
npm install  
npm start  
→ интерфейс будет на http://localhost:3000  

## .env — зачем нужен файл
`.env` — это файл с настройками проекта (пароли, ключи, адреса).  

- **Зачем:** чтобы не хранить секреты прямо в коде.  
- **Пример:** в коде пишешь `DB_PASSWORD=${POSTGRES_PASSWORD}`, а сам пароль лежит в `.env`.  
- **Удобство:** у каждого разработчика может быть свой `.env` (например, с разными паролями или базами), но код при этом одинаковый.  
- **Важно:** этот файл никогда не заливается в GitHub — для этого есть `.gitignore`.  
