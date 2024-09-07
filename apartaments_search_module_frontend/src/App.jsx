import { useState, useEffect } from 'react';
//import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	
	const [FL,setFL] = useState([]);
	
	var page = -1
	
	//Автоопределение количества страниц
	var pages = FL.length/8
	
	//Считывание количества страниц
	if(sessionStorage.getItem('pages')==undefined || sessionStorage.getItem('pages')<1) {
		sessionStorage.setItem('pages',pages);
	} else {
		pages = sessionStorage.getItem('pages')
	} 
	
	//Массив страниц (требуется для отображения списка всех страниц внизу страницы)
	var pages_arr = Array.from({length: pages}, (_, index) => index + 1)
	
	//Считывание последней выбранной пользователем страницы
	if(sessionStorage.getItem('page')==undefined || sessionStorage.getItem('page')<1) {
		sessionStorage.setItem('page',1);
	} else {
		page = sessionStorage.getItem('page')
	} 
	
	//Вычисление смещения для переключения страниц
	var pslice0 = 8*(page-1)
	var pslice1 = 8*page
	
	//Запрос списка квартир у сервера и обновление массива квартир у веб-приложения
	useEffect(function() {
		fetch('http://localhost:3010/api/request_flats_list')
		.then((res) => res.json())
		.then((result) => setFL(result.data));
	},[]);
	
	sessionStorage.setItem('prevFL',FL)
	
	//Функции управления страницами
	
	function PrevPage() {
		page--
		sessionStorage.setItem('page',page);
		location.reload();
	}
	
	function NextPage() {
		page++
		sessionStorage.setItem('page',page);
		location.reload();
	}
	
	function GoToPage() {
		//page=current_page
		sessionStorage.setItem('page',page);
		location.reload();
	}
	
	//Управление отображением кнопок переключения страниц в зависимости от того на какой пользователь странице
	useEffect(function() {
		
		var ppageBTN = document.getElementById("PrevPageBtn");
		var npageBTN = document.getElementById("NextPageBtn");
	
		if(page==1) {
			ppageBTN.hidden = true;
		} else {
			ppageBTN.hidden = false;
		}
		
		if(page==pages) {
			npageBTN.hidden = true;
		} else {
			npageBTN.hidden = false;
		}
		
	}, [page]);
	
	//---------------------------------------
	//Управление сортировкой квартир
	//---------------------------------------
	
	var sort_critery = 'none'
	var sort_type = '-+'
	
	//Считывание последнего выбранного пользователем критерия сортировки
	if(sessionStorage.getItem('sort_critery')==undefined || sessionStorage.getItem('sort_critery')<1) {
		sessionStorage.setItem('sort_critery','rooms');
	} else {
		sort_critery = sessionStorage.getItem('sort_critery')
	}
	
	//Считывание последнего выбранного пользователем типа сортировки
	if(sessionStorage.getItem('sort_type')==undefined || sessionStorage.getItem('sort_type')<1) {
		sessionStorage.setItem('sort_type','-+');
	} else {
		sort_type = sessionStorage.getItem('sort_type')
	}
	
	//Функция для захвата и обработки события изменения критерия сортировки
	function HandleSortCriteryChange(event) {
		//alert(event.target.value);
		sessionStorage.setItem('sort_critery',event.target.value);
	}
	
	//Функция для захвата и обработки события изменения типа сортировки
	function HandleSortTypeChange(event) {
		//alert(event.target.value);
		sessionStorage.setItem('sort_type',event.target.value);
	}
	
	//Функция обработки включения сортировки по дополнительным параметрам
	function HandleAdditionalChange(event) {
		
		//alert(event.target.checked);
		
		var addParam = document.getElementById('additional_parameters')
		
		if(event.target.checked==true) {
			addParam.hidden = false
		} else {
			addParam.hidden = true
		}
	}
	
	//Сортировка по objs_array - массив, тип - по убыванию или возрастанию, key - критерий сортировки
	function SortArray(objs_array,type,key) {
		
		switch(type) {
			
			case '-+':
				var sorted = objs_array.sort((obj1, obj2) => obj1[key] - obj2[key]);
				console.log('Сортировка по возрастанию\n')
				return sorted
			break;
			
			case '+-':
				var sorted = objs_array.sort((obj1, obj2) => obj2[key] - obj1[key]);
				console.log('Сортировка по убыванию\n')
				return sorted
			break;
			
			default:
				console.log('Неизвестный тип сортировки!!!')
			break;
		}
	}
	
	//Функция сортировки квартир (По неизвестной причине React отказывается обновлять квартиры на странице, но при этом сам массив сортируется!)
	function SortFlats() {
		alert('Сортировка квартир, по неизвестной причине React отказывается обновлять квартиры на странице, но при этом сам массив сортируется!')
		alert('------\nИсходный массив:\n------\n'+JSON.stringify(FL,null,1))
		
		setFL(SortArray(FL,sessionStorage.getItem('sort_type'),sessionStorage.getItem('sort_critery')))
		
		alert('------\nСортированный массив:\n------\n'+JSON.stringify(FL,null,1))
		
		//setFL(SortArray(sessionStorage.getItem('prevFL'),sessionStorage.getItem('sort_type'),sessionStorage.getItem('sort_critery')))
	}
	
	//Данная функция отвечает за отображение подробной информации о выбранной пользователем квартире
	function ShowFlatData(flat_data) {
		//alert('Flat Data: ' + JSON.stringify(flat_data,null,1))
		var FlatDataWindow = window.open('', '_blank');
		if(FlatDataWindow) {
				//Создаем страницу с подробными данными
                const FullFlatData = `
                    <!DOCTYPE html>
                    <html lang="ru">
                    <head>
                        <meta charset="UTF-8">
                        <title>Полная информация о квартире</title>
                    </head>
                    <body>
						<h1>Полная информация о квартире</h1>
                        <div>
								<img src='`+ flat_data.layout_image +`' width='50%' height='50%'></img>
								<div id='tdata_div'>
								<p class='tdata'>Этаж: ${flat_data.floor}</p>
								<p class='tdata'>Позиция на этаже: ${flat_data.pos_on_floor}</p>
								<p class='tdata'>Цена: ${flat_data.price} рублей</p>
								<p class='tdata'>Количество комнат: ${flat_data.rooms}</p>
								<p class='tdata'>Общая площадь: ${flat_data.area_total} кв.м</p>
								<p class='tdata'>Площадь кухни: ${flat_data.area_kitchen} кв.м</p>
								<p class='tdata'>Жилая площадь: ${flat_data.area_live} кв.м</p>
								</div>
								
								<style>
								#tdata_div {
									position: absolute;
									margin-left: 55%;
									margin-top: -42%;
								}
								
								.tdata {
									font-size: 1.8rem;
								}
								</style>
						</div>
                    </body>
                    </html>
                `;

                //Записываем созданную HTML страницу с подробными данными о квартире в новую вкладку
                FlatDataWindow.document.write(FullFlatData);
                FlatDataWindow.document.close();
		}
	}

/*
	const flats = [
		{
			id: 100,
			floor: 1,
			pos_on_floor: 1,
			price: 213123918,
			rooms: 3,
			area_total: 33.7,
			area_kitchen: 11.5,
			area_live: 10.6,
			layout_image: "https://cdn.com"
		},
		{
			id: 101,
			floor: 1,
			pos_on_floor: 1,
			price: 213123918,
			rooms: 3,
			area_total: 33.7,
			area_kitchen: 11.5,
			area_live: 10.6,
			layout_image: ""
		}
];*/
	
	return (
		<>
			<h1>Квартиры</h1>
			
			<a> Сортировать </a>
			
			<select id="sorting_critery" onChange={HandleSortCriteryChange}>
				<option value="" disabled>-- Выберите критерий --</option>
				<option value="none">Нет</option>
				<option value='rooms'>Количество комнат</option>
				<option value='area_total'>Общая Площадь</option>
				<option value='floor'>Этаж</option>
				<option value='price'>Цена</option>
			</select>
			
			<button onClick={SortFlats}>Сортировать квартиры</button>
			
			<br/><input type='checkbox' onChange={HandleAdditionalChange}/><a>Дополнительные параметры</a>
			
			<div id="additional_parameters" hidden>
				<a> Тип сортировки </a>
				
				<select id="sorting_type" onChange={HandleSortTypeChange}>
					<option value="" disabled>-- Выберите тип --</option>
					<option value='-+'>По возрастанию</option>
					<option value='+-'>По убыванию</option>
				</select>
			</div>
			
			{
				
				FL.slice(pslice0,pslice1).map(function(flat){
					return (
						<div>
							
							<div id={JSON.stringify(flat,null,0)}>
							
							<hr/>
							
							<div id="fimg_div">
								<img id="fimg" onClick={function(){ShowFlatData(flat)}} src={flat.layout_image}/>
							</div>
							
							<div id="fdata">
								<p>Этаж: {flat.floor}</p>
								<p>Цена: {flat.price} рублей</p>
								<p>Количество комнат: {flat.rooms}</p>
								<p>Общая площадь в кв.м: {flat.area_total}</p>
							</div>
							
							</div>
							
						</div>
					)
				})
			}
			
			
			
			<hr/>
			
			<div id="fpages">
			<button id="PrevPageBtn" onClick={PrevPage}>&lt;</button>
			
			{
				//Вывод страниц
				pages_arr.map(function(pg){
				if(pg==page) {
				return (
						<button id={`pg_${pg}`} class={'pgs'}><u>{pg}</u></button>
					)
				} else {
				return (
					<button id={`pg_${pg}`} class={'pgs'} onClick={GoToPage}>{pg}</button>
					)
				}
					
				})
			}
			
			<button id="NextPageBtn" onClick={NextPage}>&gt;</button>
			</div>
		</>
  )
}

export default App
