# Employee database

![ezgif-3-b7ab400442b2](https://user-images.githubusercontent.com/12528718/132770074-c92c7d47-8c56-49fc-8d8b-3c1ba1267ef8.gif)

## Tech stack
* __Backend:__ Python Flask (REST API)
* __DB:__ Postgres
* __Frontend:__ ReactJS TypeScript (useContext, Axios, ant.design)
* __Docker compose__

## Instalation
 
```
$ git clone https://github.com/nsr888/python_flask_react_app.git
$ Make sure your docker is running
$ cd python_flask_react_app/
$ docker-compose up
$ wait until everything is built (around 2 mins)
$ Open your favourite browser and go to http://localhost:3000/
$ Enjoy!
```

## Task overview

При выполнении тестового задания Вы можете дополнительно использовать любые сторонние Python и/или Javascript/CSS библиотеки, 
без всяких ограничений. 
Все 3rd party Python/Javascript/CSS библиотеки должны быть добавлены в проект через pip/bower/npm/yarn если библиотека поддерживает 
такой способ установки.
У нас нет никаких требований к оформлению фронтенд части, но аккуратный вид приветствуется и добавим вам бонусных пунктов.

Создайте веб страницу, которая будет выводить иерархию сотрудников в древовидной форме. 
* Информация о каждом сотруднике должна храниться в базе данных и содержать следующие данные: 
  * ФИО; 
  * Должность; 
  * Дата приема на работу; 
  * Размер заработной платы; 
* У каждого сотрудника есть 1 начальник; 
* База данных должна содержать не менее 1000 сотрудников и 3 уровней иерархий. 
* Не забудьте отобразить должность сотрудника.

