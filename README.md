# logger-cpu-load

Система сбора информации о загрузке процессора

Система состоит из двух компонентов: сервер на базе django, клиент-демон для linux. Клиент периодически отправляет данные на сервер. Сервер их сохраняет и отображает пользователю.

Клиент-демон:
- работает на linux
- каждые 10 секунд отправляет на сервер POST-запросом текущую утилизацию cpu в % и ее время
- по умолчанию адрес сервера: `http://127.0.0.1:8001`, адрес для отправки POST-запроса: `http://127.0.0.1:8001/api/log/`
- запуск клиента осуществляется командой: `python3 logger.py`
- запуск клиента с другим адресом сервера осуществляется командой: `python3 logger.py -h 'http://other-domain-dot-com'`
- после запуска демона в текущем каталоге создается pid-файл с идентификатором процесса
- остановка демона с помощью команды `start-stop-deamon -Kvp logger_CPU_load.pid`

Сервер:
- работает на Django
- rest-api организовано с помощью Django REST framework
- все данные хранятся в БД sqlite по пути `/vps`
- запуск сервера командой: `python3 manage.py runserver 127.0.0.1:8001` (либо другой адрес)
- web-страница для пользователя доступна по адресу, который задается при запуске сервера, и содержит: 
  - информацию со 100 последними записями, сортируемыми по дате и по нагрузке на CPU (обе сортировки и в порядке уменьшения, и в порядке увеличения) 
  - отдельно агрегированные данные min/max/avg от 100 последних записей
  - данные таблиц динамически обновляются каждые 5 секунд, либо по запросу пользователя
- изначально в настройках проекта Django `DEBUG=True`, что не очень безопасненько (смотри `настройки Django <https://docs.djangoproject.com/en/3.0/ref/settings/>`)
- установив `DEBUG=False`, необходимо настроить nginx (либо аналог) для передачи static-файлов

Requirements для сервера и клиент-демона:
- python==3.8.0
- requests==2.22.0
- daemonize==2.5.0
- psutil==5.7.0
- Django==3.0.8
- djangorestframework==3.11.0

Стек:
- linux, python3, Django, Django REST framework
- html, css, js, ajax, jQuery, bootstrap4
