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

app.get('/', (req, res, next) => { // nextは使用しないが一応書いておく?
    // res.json({sampleData});
    const sql = 'select * from todos';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/:id', (req, res, next) => { // nextは使用しないが一応書いておく?
    const id = parseInt(req.params.id);
    const sql = 'select * from todos where ?';
    connection.query(sql, {id: id},(err, results) => {
        if (err) throw err;
        res.json(results);
    });
    
    

});

// app.post('/', (req, res, next) => {
//     const data = req.body;
//     console.log(data);
//     res.json(data);
// });