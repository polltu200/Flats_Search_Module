const mysql = require("mysql2");
const express = require("express");

//Подключение базы данных квартир MySQL к серверу
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "apartaments",
	password: "2024"
});

connection.connect(function(err){
	if(err) {
		return console.error("Ошибка: " + err.message);
	}
	else {
		console.log("Подключение к серверу MySQL успешно установлено");
	}
});

//Тест вывода данных таблицы flats_data (выполнение запросов к базе данных)
/*connection.query("SELECT * FROM apartaments.flats_data",
  function(err, results, fields) {
    console.log(err);
    console.log(results); // собственно данные
    console.log(fields); // мета-данные полей 
});*/

/*
connection.query("SELECT * FROM apartaments.flats_data",
function(err, results, fields) {
    //console.log(err);
    console.log(JSON.stringify(results,null,0)); // собственно данные
    //console.log(fields); // мета-данные полей 
});*/

//API для взаимодействия Сервера с React приложением
function HandleCommand(rcmd,sock) {
	switch(rcmd.toString()) {
		
		//Запрос списка квартир
		case 'ReqFlatsList':
			connection.query("SELECT * FROM apartaments.flats_data",
			function(err, results, fields) {
				//sock.write(JSON.stringify(results,null,0));
				console.log('1');
			});
		break;
		
		default:
			console.log('Ошибка: Неизвестная команда!!! Тип данных: ' + typeof(rcmd) + 'Длина команды='+rcmd.length);
		break;
	}
}

//Создаём мост между React приложением и Сервером используя Express.js
const PORT = process.env.PORT || 3010;
const app = express();
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
 
//const FlatsList = require('./flats.json');

//Запрос списка квартир
 app.get('/api/request_flats_list', function(req,res) {
	//res.json({data: FlatsList})
	
	
	connection.query("SELECT * FROM apartaments.flats_data",
		function(err, results, fields) {
			//sock.write(JSON.stringify(results,null,0));
			//res.json({data: JSON.stringify(results,null,0)})
			res.json({data: results})
			//console.log('React приложение запросило список квартир!')
		});
	
});

app.listen(PORT, () => {
  console.log(`Express Server listening on ${PORT}`);
});







