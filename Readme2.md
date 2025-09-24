# Django + Next.js Фулстек prod-ready проект  

## 📑 Оглавление
- [Объяснение процессов разработки](#объяснение-процессов-разработки)  
- [Установка Docker](#установка-docker)  
- [Установка WSL и Ubuntu (для Windows)](#установка-wsl-и-ubuntu-для-windows)  
- [Клонирование проекта](#клонирование-проекта)  
- [Установка dos2unix](#установка-dos2unix)  
- [Виртуальное окружение (venv)](#виртуальное-окружение-venv)  
- [Бэкенд](#бэкенд)  
- [Фронтенд](#фронтенд)  
- [Makefile](#makefile)  
- [Доступы](#доступы)  
- [Данные администратора](#данные-администратора)  
- [Полезные команды](#полезные-команды)  
- [Git и ветки](#git-и-ветки)  
- [Логи и запуск](#логи-и-запуск)  
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
- **Логи** можно смотреть как через Docker (`docker logs`), так и локально (вывод в консоль).  

---

## Установка Docker  
curl -fsSL https://get.docker.com -o get-docker.sh  
sudo sh get-docker.sh  

---

## Установка WSL и Ubuntu (для Windows)  
wsl --install  
wsl --set-default-version 2  
wsl --install -d Ubuntu  

**Важно:** все зависимости (Python, Django, Node.js, npm) должны ставиться именно в WSL, а не в Windows.  

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

## Виртуальное окружение (venv)  
Виртуальное окружение позволяет изолировать зависимости проекта.  

Создание:  
python3 -m venv venv  

Активация:  
source venv/bin/activate  

Деактивация:  
deactivate  

Зачем: чтобы зависимости проекта не мешались с системными.  
Нужно добавить папку `venv` в `.gitignore`, чтобы не коммитить её в репозиторий.  

**Важно:**  
- Если закрыть терминал, venv деактивируется. При следующем запуске нужно снова делать `source venv/bin/activate`.  
- venv работает независимо от текущей папки (если он активирован, то действует и в подкаталогах).  

---

## Бэкенд  
Сборка контейнеров:  
docker-compose -f docker-compose.dev.yml build  

Запуск контейнеров:  
docker-compose -f docker-compose.dev.yml up  

Применение миграций базы данных:  
docker exec -it server python manage.py migrate  

Локальный запуск без Docker:  
pip install -r requirements.txt  
python manage.py migrate  
python manage.py runserver  

---

## Фронтенд  
Запуск через Docker:  
docker-compose -f docker-compose.dev.yml up client  

Локальный запуск без Docker:  
cd client  
npm install  
npm run dev  

Интерфейс будет доступен на http://localhost:3000  

---

## Makefile  
В проекте есть `Makefile`, который упрощает команды.  

- make up — Запуск проекта (все контейнеры).  
- make down — Остановка контейнеров.  
- make logs — Логи всех сервисов.  
- make backend — Запуск только Django сервера.  
- make frontend — Запуск только React клиента.  
- make db-shell — Консоль PostgreSQL.  
- make db-migrate — Применить миграции.  
- make clean — Полностью удалить контейнеры и тома.  

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
- Проверить версию Django: `python -m django --version`  

---

## Git и ветки  
- При переключении веток (`git checkout`) файлы могут оставаться изменёнными.  
- Если ветка не переключается или файлы мешают, используйте:  
  - `git stash` (временное сохранение изменений)  
  - или `git checkout -f branchname` (форсированное переключение).  

---

## Логи и запуск  
- В Docker: `docker compose logs -f server` или `make logs`.  
- Локально: всё выводится прямо в терминал (`runserver`, `npm run dev`).  

---

## Дополнительно  
- Сборка контейнеров: `docker-compose build`  
- Запуск контейнеров: `docker-compose up -d`  
- Остановка: `docker-compose down`  

---

## Процесс разработки  
### Вариант 1 — через Docker (универсально)  
- Всё запускается через `docker-compose up`  отстальные команды описаны в Makefile в корне проекта. make help чтобы увидеть список команд
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

---

## .env — зачем нужен файл
`.env` — это файл с настройками проекта (пароли, ключи, адреса).  

- **Зачем:** чтобы не хранить секреты прямо в коде.  
- **Пример:** в коде пишешь `DB_PASSWORD=${POSTGRES_PASSWORD}`, а сам пароль лежит в `.env`.  
- **Удобство:** у каждого разработчика может быть свой `.env` (например, с разными паролями или базами), но код при этом одинаковый.  
- **Важно:** этот файл никогда не заливается в GitHub — для этого есть `.gitignore`.  

## Виртуальное окружение Python (venv)

1. Чтобы создать виртуальное окружение, используйте команду:
   python -m venv venv

2. Активация виртуального окружения:
   source venv/bin/activate

3. Деактивация окружения:
   deactivate

После активации окружения в начале строки терминала появится (venv). Это значит, что все команды python и pip теперь будут выполняться внутри окружения.

## Установка Django без проекта

Если вы хотите использовать Django вне Docker, его нужно установить вручную в виртуальное окружение:
   pip install django

Проверка версии:
   python -m django --version

Если пишет "No module named django", значит пакет не установлен в текущем окружении.

## Git и игнорирование venv

Папку venv нужно добавить в .gitignore, чтобы она не попадала в репозиторий. Это стандартная практика, так как окружение создаётся локально у каждого разработчика.

Пример записи:
   venv/

## Работа с npm

npm и nodejs не связаны с Python и виртуальными окружениями, они будут работать как обычно в системе. Если нужно запускать фронтенд — используйте обычные команды npm install, npm run dev и т.п. в папке frontend (или где у вас проект).

## Поведение при закрытии терминала

Если закрыть терминал, виртуальное окружение деактивируется автоматически. При новом запуске нужно снова активировать:
   source venv/bin/activate

## Работа с Docker

Если проект запускается через Docker, используйте команды:
   docker compose up
   docker compose up server
   docker compose logs -f

В проекте есть Makefile, который упрощает работу:
   make backend — запуск только backend
   make up — запуск всего проекта
   make down — остановка
   make logs — просмотр логов

## Обновление пакетов

Чтобы обновить зависимости в виртуальном окружении, используйте:
   pip install -U <package_name>

Если нужно обновить все пакеты сразу (на основе requirements.txt):
   pip install --upgrade -r requirements.txt

После этого можно сгенерировать новый список зависимостей:
   pip freeze > requirements.txt

В Docker-проектах обновление пакетов требует пересборки образа:
   docker compose build --no-cache server
   docker compose up server

Таким образом, локально пакеты обновляются через pip, а в Docker — через пересборку контейнеров.