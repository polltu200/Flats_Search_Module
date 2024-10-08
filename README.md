# Модуль поиска и отображения квартир

Данный модуль позволяет удобно сортировать и находить квартиры по следующим критериям:
#### Этаж
#### Цена
#### Количество комнат
#### Площадь в квадратных метрах

## Требования для локального запуска

#### Node.js 20.17.0
#### Express 4.19.2
#### React 18.3.1
#### MySQL 8.0.36

## Как установить

1. Установить Node.js

2. Скачать репозиторий как .zip архив

3. Распаковать содержимое архива в любую папку

4. Для установки зависимостей прописать следующую команду находясь в папке apartaments_search_module_backend и также для папки apartaments_search_module_frontend

```
npm install
```

5. Скачать MySQL сервер баз данных по ссылке: https://dev.mysql.com/downloads/mysql/

6. Переместить сервер баз данных MySQL в директорию C:/mysql или создать символическую ссылку на диске C для этой директории

7. Инициализировать базу данных командой и скопировать временный пароль отображаемый в консоли:

```
mysqld --initialize --console
```

8. Запустите mysql сервер с консольным доступом:

```
mysqld --console
```

9. Запустите в соседней консоли не выключая сервер, консольный клиент и введите временный пароль для доступа:

```
mysql -u root -p
```

10. Измените временный пароль на постоянный пароль 2024 (потом можно изменить этой же командой) используя команду:

```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '2024';
```

11. Для импорта базы данных понадобиться программа MySQL Workbench с сайта MySQL

11.1 Войдите в базу данных используя логин root и ранее заданный пароль

11.2 Создайте новую схему и назовите её apartaments

11.3 Выберите схему и импортируйте в базу данных файл flats_data - flats_data.csv

## Как запустить локально

1. Запуск базы данных осуществляется в командной строке из директории C:/mysql/mysql-версия-(ОС и Разрядность)/bin командой

```
mysqld.exe
```

2. для запуска сервера в директории apartaments_search_module_backend запустить start.bat или прописать в командной строке находясь в той же директории:

```
node index.js
```

3.1 для запуска React веб-приложения только на данном компьютере в директории apartaments_search_module_frontend запустить start.bat или прописать команду находясь в той же директории:

```
npm run dev
```

3.2 или для запуска React веб-приложения в локальной сети в директории apartaments_search_module_frontend запустить start_in_lan.bat или прописать команду находясь в той же директории:

```
npm run dev -- --host 0.0.0.0
```

## Примечание
Для работы в локальной сети или в интернете нужно изменить IP в файле App.jsx на 54 строке вместо localhost:

```
useEffect(function() {
		fetch('http://[IP или Домен устройства на котором запущен сервер приложения]:3010/api/request_flats_list')
		.then((res) => res.json())
		.then((result) => setFL(result.data));
	},[]);
```
	
## В данном проекте использованы следующие компоненты:
#### Node.js (лицензия MIT) сайт - https://nodejs.org/en
#### Express (лицензия MIT) сайт - https://expressjs.com/
#### React (лицензия MIT) сайт - https://ru.legacy.reactjs.org/
#### MySQL (лицензия GNU GPL) сайт - https://www.mysql.com/
