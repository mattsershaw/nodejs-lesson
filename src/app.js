// console.log('Hello');

// const http = require('http');

// const hostname = '127.0.0.1'; // 自分のIPアドレスがこれ
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// これはimportのような意味
const express = require('express'); // JSの書き方はcommon jsとes modules. commonはフロントだと難しいのでes modulesが事実上のスタンダードになった
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const Todo = require('./model/Todo');
const TodoRepository = require('./repository/TodoRepository');
const TodoService = require('./service/TodoService');
const TodoController = require('./controller/todoController');

//#region expressでWebサーバーの設定

const server = app.listen(4000, () => {
    console.log('Node.js is listen to PORT:' + server.address().port);
});

app.disable('x-powered-by');
app.use(cors()).use(bodyParser.json());

//#endregion

//#region mysqlに接続

// mysqlに接続
const connection = mysql.createConnection({
    host: 'localhost', // 他の名前だとできない
    port: 3306, // 基本的に
    user: 'user',
    password: 'password',
    database: 'sample_database'
}); // インポートした

connection.connect((err) => {
    if (err) throw err;
    console.log('connected mysql');
});

//#endregion

// const sampleData = [
//     {
//         id: 0,
//         title: 'Sample Data 1',
//         description: 'Sample Data 1'
//     },
//     {
//         id: 1,
//         title: 'Sample Data 2',
//         description: 'Sample Data 2'
//     }
// ]

const todoRepository = new TodoRepository(connection);
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

app.use('/api/', todoController.router);

// const todoUrl = '/api/todos'

// app.get(todoUrl, async (req, res,next) => {
//     const todos = await todoService.getAll();
//     res.status(200).json(todos);
// });

// app.get(todoUrl + '/:id', async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const todo = await todoService.get(id);
//     res.status(200).json(todo);
// });

// app.post(todoUrl, async (req, res, next) => {
//     const todo = new Todo(0, req.body.title, req.body.description);
//     const insertId = await todoService.create(todo); // await書く時async必要
//     res.status(201).json(insertId);
// });

// app.put(todoUrl + '/:id', async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const data = req.body;
//     const todo = new Todo(id, data.title, data.description);
//     const result = await todoService.update(todo);
//     res.status(200).json(result);
// });

// app.delete(todoUrl + '/:id', async (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const result = await todoService.delete(id);
//     res.status(204).json(result);
// });

// -----------------------------------------------

// app.get(todoUrl + '/', (req, res, next) => { // nextは使用しないが一応書いておく?
//     // res.json({sampleData});
//     const sql = 'select * from todos';
//     connection.query(sql, (err, results) => {
//         if (err) throw err;
//         res.status(200).json(results); // 200で返す
//     });
// });

// app.get(todoUrl + '/:id', (req, res, next) => { // nextは使用しないが一応書いておく?
//     const id = parseInt(req.params.id);
//     const sql = 'select * from todos where ?';
//     connection.query(sql, {id: id},(err, results) => {
//         if (err) throw err;
//         res.status(200).json(results[0]); //[0]を追加
//     });
    
    

// });

// app.post(todoUrl + '/', (req, res, next) => {
//     const data = req.body;
//     const sql = 'insert into todos set ?';
//     // title,description values("title", "description")';
//     connection.query(sql, data, (err, result) => {
//         if (err) throw err;
//         console.log(result)
//         res.status(201).json(result.insertId);
//     });
//     // console.log(data);
//     // res.json(data);
// });

// app.put(todoUrl + '/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const data = req.body;
//     const sql = 'update todos set ? where ?'; // `title`="test", `description`="test"
//     connection.query(sql, [data, {id: id}], (err, result) => { // `id`="id"
//         if (err) throw err;
//         console.log(result)
//         res.status(200).json(result);
//     });
// });

// app.delete(todoUrl + '/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     const sql = 'delete from todos where ?'; // `id`=6
//     connection.query(sql, {id: id}, (err, result) => {
//         if (err) throw err;
//         res.status(204).json(result);
//     });
// });